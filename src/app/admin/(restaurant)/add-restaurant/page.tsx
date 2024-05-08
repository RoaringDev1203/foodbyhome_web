
import PersonalDetailsForm from './PersonalDetailsForm'
import BusinessDetailForm from './BusinessDetailForm'
import BankDetailsForm from './BankDetailsForm'
import { BreadcrumbAdmin } from '@/components'
import { useCallback, useEffect, useState } from 'react'
import { BankDetails, BusinessDetails, PersonalDetails } from '@/types/user'
import { BASE_URL } from '@/common/constants'
import httpClient from '@/helpers/httpClient'
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'sonner'
const stripeKey = process.env.STRIPE_PUBLISHABLE_KEY
const stripePromise = stripeKey && loadStripe(stripeKey);

const AddRestaurant = () => {
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({} as PersonalDetails);
  const [businessDetails, setBusinessDetails] = useState<BusinessDetails>({} as BusinessDetails);
  const [bankDetails, setBankDetails] = useState<BankDetails>({} as BankDetails);

  useEffect(() => {
    if (personalDetails && businessDetails && bankDetails) {
      // Perform actions that depend on updated states
    }
  }, [personalDetails, businessDetails, bankDetails]);


  const handlePersonalDetailsSubmit = useCallback((details: PersonalDetails) => {
    if (details.individual_dob) {
      const date = new Date(details.individual_dob);
      const formattedDate = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
      details = {
        ...details,
        individual_dob: formattedDate
      };
    }

    setPersonalDetails(details);
    // You can also handle other logic here, such as sending data to backend
    console.log('Personal Details:', details);
  }, []);


  const createRestaurant = async (personalDetails: PersonalDetails, businessDetails: BusinessDetails, bankDetails: BankDetails) => {
    let restaurantDetails = {
      ...personalDetails,
      ...businessDetails,
      ...bankDetails,
    };
    console.log('restaurantDetails', restaurantDetails)
    if (Object.keys(restaurantDetails).length > 0 && Object.keys(personalDetails).length > 0 && Object.keys(businessDetails).length > 0 && Object.keys(bankDetails).length > 0 && restaurantDetails.individual_address && restaurantDetails.minDelivery && restaurantDetails.account_number) {
      console.log(personalDetails);
      console.log(businessDetails);
      console.log(bankDetails);

      const stripe = await stripePromise;

      // Call your backend to create the VerificationSession.
      const response = await fetch(BASE_URL + '/stripe/create-verification-session', { method: 'POST' });
      const session = await response.json();
      console.log(session)
      // When the user clicks on the button, redirect to the session URL.
      // Show the verification modal
      if (restaurantDetails.restaurant_name != '' || restaurantDetails.restaurant_name != undefined) {
        const result = await stripe.verifyIdentity(session.client_secret);
        if (result.error) {
          // Handle errors
          console.error(result.error.message);
        } else {
          const { data: { status: verificationStatus, last_verification_report } } = await httpClient.get(`${BASE_URL}/stripe/verification_session/${session.verification_session_id}`);
          console.log('last_verification_report', last_verification_report)
          console.log('verificationStatus', verificationStatus)

          if (verificationStatus === 'verified') {

            // henter data fra stripe for at sammenligne og navne der er instated er ens med dem fra stripe
            const { data: { document: { first_name, last_name } } } = await httpClient.get(`${BASE_URL}/stripe/verification_report/${last_verification_report}`);

            const { individual_firstname, individual_lastname } = personalDetails;

            if (first_name === individual_firstname && last_name === individual_lastname) {
              let newRestaurantDetails = {
                ...restaurantDetails,
                status: 'New',
                report_id: last_verification_report,
              };
              const res = await httpClient.post(BASE_URL + "/restaurant/create", newRestaurantDetails);
              console.log('res', res)
              console.log('res', res.status)


              toast.success("Successfully user verified", { position: "top-right", duration: 2000 });
              console.log('Data er ens');
            } else {
              toast.error("User not verified", { position: "top-right", duration: 2000 });
              console.log('first_name', first_name)
              console.log('last_name', last_name)
              console.log('individual_firstname', individual_firstname)
              console.log('individual_lastname', individual_lastname)
              console.log('Data er ikke ens');

            }
          }
          // Redirect to confirmation page
          console.log(result)
          // window.location.href = 'confirmation.html';
        }
      } else {
        toast.error("Missing fields", { position: "top-right", duration: 2000 });
      }
    } else {
      console.log('personalDetails findes ikk')
    }
  };


  const handleBusinessDetailsSubmit = useCallback((details: BusinessDetails) => {
    setBusinessDetails(details);
    // Handle form submission logic here
    console.log('Business Details:', details);
  }, []);

  const handleBankDetailsSubmit = useCallback(async (details: BankDetails) => {
    setBankDetails(details);
    await createRestaurant(personalDetails, businessDetails, details); // Pass the most recent details directly
    console.log('Bank Details:', details);
  }, [personalDetails, businessDetails]);


  return (
    <div className="w-full lg:ps-64">
      <div className="page-content space-y-6 p-6">
        <BreadcrumbAdmin title="Add Restaurant" subtitle="Restaurants" link="/admin/restaurants" />
        <div>
          <nav className="mb-6 flex flex-wrap justify-center gap-4" aria-label="Tabs" role="tablist">
            <button
              type="button"
              className="active flex w-full justify-center rounded-lg bg-primary/10 px-20 py-3 text-center text-sm font-medium text-primary hs-tab-active:bg-primary hs-tab-active:text-white sm:w-auto"
              data-hs-tab="#tabPersonalDetail"
              aria-controls="tabPersonalDetail"
              role="tab"
            >
              Personal Detail
            </button>
            <button
              type="button"
              className="flex w-full justify-center rounded-lg bg-primary/10 px-20 py-3 text-center text-sm font-medium text-primary hs-tab-active:bg-primary hs-tab-active:text-white sm:w-auto"
              data-hs-tab="#tabBusinessDetail"
              aria-controls="tabBusinessDetail"
              role="tab"
            >
              Business Detail
            </button>
            <button
              type="button"
              className="flex w-full justify-center rounded-lg bg-primary/10 px-20 py-3 text-center text-sm font-medium text-primary hs-tab-active:bg-primary hs-tab-active:text-white sm:w-auto"
              data-hs-tab="#tabBankDetail"
              aria-controls="tabBankDetail"
              role="tab"
            >
              Bank Detail
            </button>
          </nav>
          <div className="rounded-lg border border-default-200 p-6">
            <PersonalDetailsForm onSubmit={handlePersonalDetailsSubmit} />
            <BusinessDetailForm onSubmit={handleBusinessDetailsSubmit} />
            <BankDetailsForm onSubmit={handleBankDetailsSubmit} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddRestaurant
