
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { LuEraser, LuSave } from 'react-icons/lu'
import { DateFormInput, TextFormInput } from '@/components'
import { PersonalDetails } from '@/types/user'
import { generatePassword } from '@/helpers/passwordGenerator'


interface PersonalDetailsFormProps {
  onSubmit: (data: PersonalDetails) => void;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ onSubmit }) => {
  const personalDetailsFormSchema = yup.object({
    individual_firstname: yup.string().required('Please enter your first name'),
    individual_lastname: yup.string().required('Please enter your last Name'),
    individual_phone: yup.string().required('Please enter your contact Number'),
    individual_cpr: yup.string().required('Please enter your PAN NO.'),
    individual_email: yup.string().email('Please enter a valid email').required('Please enter your email'),
    individual_dob: yup.string().required('Please select your Birth Date'),
    individual_city: yup.string().required('Please select your City'),
    individual_address: yup.string().required('Please select your Address'),
    individual_postal_code: yup.string().required('Please select your ZIP/Postal code'),
    individual_state: yup.string().required('Please Enter your State'),
  })

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(personalDetailsFormSchema),
  })



  const onSubmitInternal = (data: PersonalDetails) => {
    const newPassword = generatePassword(12);
    const completeData = { ...data, username: data.individual_firstname, password: newPassword };
    onSubmit(completeData);
  };


  return (
    <form onSubmit={handleSubmit(onSubmitInternal)} id="tabPersonalDetail" role="tabpanel">
      <h4 className="mb-6 text-lg font-medium text-default-900">Step 1:</h4>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <TextFormInput name="individual_firstname" type="text" label="First Name" placeholder="Enter Your First Name" control={control} fullWidth />
        <TextFormInput name="individual_lastname" type="text" label="Last Name" placeholder="Enter Your Last Name" control={control} fullWidth />
        <TextFormInput name="individual_phone" type="text" label="Phone Number" placeholder="Enter Your Phone Number" control={control} fullWidth />
        <TextFormInput name="individual_cpr" type="text" label="CPR Number" placeholder="Enter Your Cpr Number" control={control} fullWidth />
        <TextFormInput name="individual_email" type="email" label="Email" placeholder="Enter Your Email" control={control} fullWidth />
        <DateFormInput
          name="individual_dob"
          type="date"
          label="Birth of Date"
          className="block w-full rounded-lg border border-default-200 bg-transparent px-4 py-2.5 dark:bg-default-50"
          placeholder="12/9/1998"
          options={{
            dateFormat: 'd/m/Y',
            defaultDate: "12/9/1988"
          }}
          fullWidth
          control={control}
        />
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <TextFormInput name="individual_city" type="text" label="City" placeholder="Enter Your City" control={control} fullWidth />
        <TextFormInput name="individual_address" type="text" label="Address" placeholder="Enter Your Address" control={control} fullWidth />
        <TextFormInput name="individual_postal_code" type="number" label="Zip Code" placeholder="Enter Your Zip Code" control={control} fullWidth />
        <TextFormInput name="individual_state" type="text" label="State" placeholder="Enter Your State" control={control} fullWidth />
      </div>
      <div className="flex flex-wrap justify-end gap-4">
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-primary-500"
        >
          <LuSave size={20} />
          Save
        </button>
      </div>
    </form>
  )
}

export default PersonalDetailsForm
