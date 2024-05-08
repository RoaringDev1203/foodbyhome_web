
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { LuEraser, LuSave } from 'react-icons/lu'
import { TextFormInput } from '@/components'
import { BankDetails } from '@/types/user'

interface BankDetailsFormProps {
  onSubmit: (data: BankDetails) => void;
}

const BankDetailsForm: React.FC<BankDetailsFormProps> = ({ onSubmit }) => {
  const bankDetailsFormSchema = yup.object({
    account_number: yup.string().required('Please enter your Account Number'),
    account_holder_name: yup.string().required('Please enter your Account Holder Name'),
    payout_schedule: yup.string().required('Please enter your Payout Schedule'),
  })

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(bankDetailsFormSchema),
  })


  const onSubmitInternal = (data: BankDetails) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitInternal)} id="tabBankDetail" className="hidden" role="tabpanel">
      <h4 className="mb-6 text-lg font-medium text-default-900">Step 3:</h4>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <TextFormInput name="account_number" type="text" label="Account Number" placeholder="Enter Your Account Number (IBAN)" control={control} fullWidth />
        <TextFormInput name="account_holder_name" type="text" label="Account Holder Name" placeholder="Enter Your Account Holder Name" control={control} fullWidth />
        <TextFormInput name="payout_schedule" type="number" min={7} label="Payout Schedule" placeholder="Enter Your Payout Schedule" control={control} fullWidth />
      </div>
      <div className="flex flex-wrap justify-end gap-4">
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary-500"
        >
          <LuSave size={20} />
          Create Restaurant
        </button>
      </div>
    </form>
  )
}

export default BankDetailsForm
