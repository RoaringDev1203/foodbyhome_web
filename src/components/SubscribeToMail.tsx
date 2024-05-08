
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { LuArrowRight, LuMail } from 'react-icons/lu'
import { TextFormInput } from './index'

const SubscribeToMail = () => {
  const subscribeSchema = yup.object({
    email: yup.string().email('Please enter a valid email').required('Please enter your email'),
  })

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(subscribeSchema),
  })

  return (
    <div className="col-span-1">
      <div className="flex flex-col gap-3">
        <div className="rounded-lg bg-primary/10">
          <div className="p-8">
            <form className="mb-6 space-y-2" onSubmit={handleSubmit(() => { })}>
              <label htmlFor="subscribeEmail" className="mb-4 text-lg font-medium text-default-950">
                Subscribe
              </label>
              <div className="flex rounded-md shadow-sm">
                <TextFormInput
                  name="email"
                  className="form-input  bg-white"
                  control={control}
                  placeholder="Email address"
                  endButtonIcon={<LuArrowRight size={20} />}
                  startInnerIcon={<LuMail size={20} />}
                  fullWidth
                />
              </div>
            </form>
            <p className="mb-6 text-sm text-default-500">
              Tilmeld dig FoodbyHome e-mail notifikationer for at få besked om alle pengesparende og mavefyldende tilbud. Indtast din e-mailadresse for at komme i gang{' '}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscribeToMail
