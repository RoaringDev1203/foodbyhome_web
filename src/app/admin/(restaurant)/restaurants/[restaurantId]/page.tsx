import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaStar } from 'react-icons/fa6'
import { getAllFoods, getRestaurantById } from '@/helpers'
import { BreadcrumbAdmin } from '@/components'
import { RestaurantMenuDataTable } from '@/components/data-tables'
import CostAndUsageChart from './CostAndUsageChart'
import { avatar1Img, avatar2Img } from '@/assets/data/images'
import type { Food, RestaurantApiType } from '@/types/food'
import { loadStripe } from '@stripe/stripe-js'
import { BASE_URL } from '@/common/constants'
import httpClient from '@/helpers/httpClient'

const RestaurantDetails = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState<RestaurantApiType | undefined>()
  const [foods, setFoods] = useState<Food>()
  const stripeKey = process.env.STRIPE_PUBLISHABLE_KEY
  const stripePromise = stripeKey && loadStripe(stripeKey);

  useEffect(() => {
    (async () => {
      const foundFoods = await getAllFoods(restaurantId as string); // Assert that restaurantId is a string
      const foundRestaurant = await getRestaurantById(restaurantId as string); // Assert that restaurantId is a string
      setRestaurant(foundRestaurant);
      setFoods(foundFoods)
    })();
  }, [restaurantId]);


  const verifyRestaurant = async () => {
    const stripe = await stripePromise;
    // Call your backend to create the VerificationSession.
    const response = await fetch(BASE_URL + '/stripe/create-verification-session', { method: 'POST' });
    const session = await response.json();

    const result = await stripe.verifyIdentity(session.client_secret);
    if (result.error) {
      // Handle errors
      console.error(result.error.message);
    } else {
      //const { data: { status: verificationStatus, last_verification_report } } = await httpClient.get(`${BASE_URL}/stripe/verification_session/${session.verification_session_id}`);

    }
  }


  if (foods) {
    return (
      <div className="w-full lg:ps-64">
        <div className="page-content space-y-6 p-6">
          <BreadcrumbAdmin title={restaurant?.restaurant_name} subtitle="Restaurants" link="/admin/restaurants" />
          <div className="mb-6 rounded-lg border border-default-200 p-6">
            <img src={restaurant?.bgBackground} className="hidden w-full md:flex h-40" alt="background" />
            <div className="flex items-center gap-3 md:-mt-14 md:items-end">
              <img src={restaurant?.logo} className="h-28 w-28 rounded-full bg-default-50" alt="restaurant" />
              <div>
                <h4 className="mb-1 text-base font-medium text-default-800">{restaurant?.restaurant_name}</h4>
                <p className="text-sm text-default-600">Since {restaurant?.created_at}</p>
              </div>
              {restaurant?.status == 'New' ? (
                <button
                  onClick={() => verifyRestaurant()}
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-10 py-3 text-base font-medium capitalize text-white transition-all hover:bg-primary-500"
                >
                  <p>Verify</p>
                </button>
              ) : (
                <button
                  onClick={() => verifyRestaurant()}
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-10 py-3 text-base font-medium capitalize text-white transition-all hover:bg-primary-500"
                >
                  <p>Edit</p>
                </button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <CostAndUsageChart />

              <RestaurantMenuDataTable rows={foods} buttonLink={"/admin/add-dish/" + restaurantId} buttonText="Add Dish" title="Menu" />
            </div>
            <div className="xl:col-span-1">
              <div className="mb-6 rounded-lg border border-default-200">
                <div className="border-b border-b-default-300 p-6">
                  <h4 className="text-xl font-medium text-default-900">Owner restaurant</h4>
                </div>
                <div className="px-6 py-5">
                  <table cellPadding={10}>
                    <tbody>
                      <tr>
                        <td className="text-start text-base font-medium">Owner Name:</td>
                        <td className="text-start">{restaurant?.individual_data?.individual_firstname + ' ' + restaurant?.individual_data?.individual_lastname}</td>
                      </tr>
                      <tr>
                        <td className="text-start text-base font-medium">Email:</td>
                        <td className="text-start">{restaurant?.individual_data?.individual_email}</td>
                      </tr>
                      <tr>
                        <td className="text-start text-base font-medium">Phone:</td>
                        <td className="text-start">{restaurant?.individual_data?.individual_phone}</td>
                      </tr>
                      <tr>
                        <td className="text-start text-base font-medium">Location:</td>
                        <td className="text-start">
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant?.address + ' ' + restaurant?.city)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {restaurant?.address + ' ' + restaurant?.city}
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mb-6 rounded-lg border border-default-200">
                <div className="border-b border-b-default-300 p-6">
                  <h4 className="text-xl font-medium text-default-900">Customer Reviews</h4>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex items-center gap-2">
                      <h5 className="text-sm">5</h5>
                      <div className="flex h-2 w-full overflow-hidden rounded-lg bg-default-100">
                        <div className="w-full rounded-lg bg-yellow-400" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <h5 className="text-sm">4</h5>
                      <div className="flex h-2 w-full overflow-hidden rounded-lg bg-default-100">
                        <div className="w-4/5 rounded-lg bg-yellow-400" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <h5 className="text-sm">3</h5>
                      <div className="flex h-2 w-full overflow-hidden rounded-lg bg-default-100">
                        <div className="w-3/5 rounded-lg bg-yellow-400" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <h5 className="text-sm">2</h5>
                      <div className="flex h-2 w-full overflow-hidden rounded-lg bg-default-100">
                        <div className="w-2/5 rounded-lg bg-yellow-400" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <h5 className="text-sm">1</h5>
                      <div className="flex h-2 w-full overflow-hidden rounded-lg bg-default-100">
                        <div className="w-1/5 rounded-lg bg-yellow-400" />
                      </div>
                    </div>
                  </div>
                  <div className="mb-6 flex justify-around">
                    <div className="text-center">
                      <h2 className="mb-1 text-2xl font-medium text-default-900">
                        4.5 <FaStar size={20} className="inline-flex fill-yellow-400 align-middle text-yellow-400" />
                      </h2>
                      <p className="block text-xs text-default-600">452 Reviews</p>
                    </div>
                    <div className="text-center">
                      <h2 className="mb-1 text-2xl font-medium text-default-900">91%</h2>
                      <p className="block text-xs text-default-600">Recommended</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="mb-4 flex items-center gap-3">
                      <img src={avatar1Img} className="h-11 w-11 rounded-full" alt="avatar" />
                      <div className="flex-grow">
                        <h4 className="mb-1 text-xs text-default-700">
                          Kianna Stanton <span className="text-default-600">🇺🇸US</span>
                        </h4>
                        <h4 className="text-xs text-green-400">Verified Buyer</h4>
                      </div>
                      <div>
                        <FaStar size={20} className="inline-flex fill-yellow-400 align-middle text-yellow-400" />
                        <FaStar size={20} className="inline-flex fill-yellow-400 align-middle text-yellow-400" />
                        <FaStar size={20} className="inline-flex fill-yellow-400 align-middle text-yellow-400" />
                        <FaStar size={20} className="inline-flex fill-yellow-400 align-middle text-yellow-400" />
                        <FaStar size={20} className="inline-flex fill-yellow-400 align-middle text-yellow-400" />
                      </div>
                    </div>
                    <h5 className="mb-2 text-sm text-default-600">SO DELICIOUS 🍯💯</h5>
                    <p className="text-sm text-default-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                      enim ad minim veniam, quis nostrud exercitation.
                    </p>
                  </div>
                  <div className="mb-4">
                    <div className="mb-4 flex items-center gap-3">
                      <img src={avatar2Img} className="h-11 w-11 rounded-full" alt="avatar" />
                      <div className="flex-grow">
                        <h4 className="mb-1 text-xs text-default-700">
                          Ryan Rhiel Madsen <span className="text-default-600">🇺🇸US</span>
                        </h4>
                        <h4 className="text-xs text-green-400">Verified Buyer</h4>
                      </div>
                      <div>
                        <FaStar size={20} className="inline-flex fill-yellow-400 align-middle text-yellow-400" />
                        <FaStar size={20} className="inline-flex fill-yellow-400 align-middle text-yellow-400" />
                        <FaStar size={20} className="inline-flex fill-yellow-400 align-middle text-yellow-400" />
                        <FaStar size={20} className="inline-flex fill-yellow-400 align-middle text-yellow-400" />
                        <FaStar size={20} className="inline-flex fill-yellow-400 align-middle text-yellow-400" />
                      </div>
                    </div>
                    <h5 className="mb-2 text-sm text-default-600">SO DELICIOUS 🍯💯</h5>
                    <p className="text-sm text-default-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                      enim ad minim veniam, quis nostrud exercitation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RestaurantDetails
