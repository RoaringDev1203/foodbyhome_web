
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useAuthContext } from "@/context";
import { yupResolver } from '@hookform/resolvers/yup'
import { LuEraser, LuPen, LuSave, LuX } from 'react-icons/lu'
import { SelectFormInput, TextFormInput } from '@/components'
import { FilePond } from 'react-filepond'
import { BASE_URL } from '@/common'
import { useState } from 'react';
import DatePicker from 'react-flatpickr';
import { BusinessDetails } from '@/types/user';

type TimeFrame = {
  to: string;
  from: string;
  dayOfWeek: string;
  workingAfterMidnight: boolean;
}
type BusinessDetailFormProps = {
  onSubmit: (data: BusinessDetails) => void;
}

const BusinessDetailForm: React.FC<BusinessDetailFormProps> = ({ onSubmit }) => {
  const { session } = useAuthContext();
  const [logoLink, setLogoLink] = useState<string>('');
  const [bgBackground, setBgLink] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [tempTimeFrame, setTempTimeFrame] = useState<TimeFrame[]>([]);
  const [timeFrom, setTimeFrom] = useState('');
  const [timeTo, setTimeTo] = useState('');
  const [workingDay, setWorkingDay] = useState('');
  const [workingAfterMidNight, setWorkingAfterMidNight] = useState(false);



  const businessDetailsFormSchema = yup.object({
    restaurant_name: yup.string().required('Please enter your Restaurant name'),
    cvr: yup.string().required('Please enter your business type'),
    phone: yup.number().required('Please enter your phone Number'),
    city: yup.string().required('Please enter your city'),
    address: yup.string().required('Please enter website url'),
    email: yup.string().email('Please enter a valid email').required('Please enter your email'),
    zipCode: yup.string().required('Please Enter your Zip Code'),
    language: yup.object().required('Please Enter your Language'),
    duration: yup.string().required('Please Enter your Duration'),
    minDelivery: yup.string().required('Please Enter your Min Delivery'),
  })

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(businessDetailsFormSchema),
  })

  const deleteTimes = (index: Number) => {
    setTempTimeFrame(tempTimeFrame.filter((_, i) => i !== index));
  }

  const onSubmitInternal = (data: BusinessDetails) => {
    const completeData = { ...data, logo: logoLink, bgBackground: bgBackground };
    onSubmit(completeData);
  };

  const closeModal = () => {
    // Close the modal dialog
    const modal = document.getElementById('closeModal');
    if (modal) {
      modal.click()
    }
  };

  const handleFormSubmit = (data: any) => {
    const completeData = {
      ...data,
      logo: logoLink, // Use state or another method to get these values
      bgBackground: bgBackground,
      openingHours: tempTimeFrame,
      language: data.language.value
    };
    onSubmitInternal(completeData);
  };

  const handleSaveAndClose = () => {
    createTimeFrame();
    closeModal()
  };


  const createTimeFrame = () => {
    const newTimeFrame: TimeFrame = {
      to: timeTo,
      from: timeFrom,
      dayOfWeek: workingDay,
      workingAfterMidnight: workingAfterMidNight
    };

    setTempTimeFrame([...tempTimeFrame, newTimeFrame]);
  };


  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} id="tabBusinessDetail" className="hidden" role="tabpanel">
      <h4 className="mb-6 text-lg font-medium text-default-900">Step 2:</h4>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <input type="hidden" name="openingHours" value={JSON.stringify(tempTimeFrame)} />
        <TextFormInput name="restaurant_name" type="text" label="Restaurant Name" placeholder="Enter Your Restaurant Name" control={control} fullWidth />
        <TextFormInput name="cvr" type="number" label="CVR" placeholder="Enter Your CVR" control={control} fullWidth />
        <TextFormInput name="phone" type="text" label="Phone Number" placeholder="Enter Your phone Number" control={control} fullWidth />
        <TextFormInput name="email" type="text" label="Email" placeholder="Enter Your Restaurant email" control={control} fullWidth />
        <TextFormInput name="address" type="text" label="Address" placeholder="Enter address" control={control} fullWidth />
        <TextFormInput name="city" type="text" label="City" placeholder="Enter Restaurant City" control={control} fullWidth />
        <TextFormInput name="zipCode" type="text" label="Zip Code" placeholder="Enter Restaurant zipCode" control={control} fullWidth />
        <SelectFormInput
          name="language"
          label="Language"
          control={control}
          id="language"
          instanceId="language"
          options={[
            { value: 'en', label: 'English' },
            { value: 'da', label: 'Danish' },
            { value: 'no', label: 'Norwegian' },
            { value: 'tr', label: 'Turkish' },
            { value: 'ar', label: 'Arabic' },
            { value: 'de', label: 'German' },
            { value: 'el', label: 'Greek' },
            { value: 'es', label: 'Spanish' },
            { value: 'fr', label: 'French' },
            { value: 'zh', label: 'Chinese' },
            { value: 'ru', label: 'Russian' },
            { value: 'pt', label: 'Portuguese' },
            { value: 'ja', label: 'Japanese' },
            { value: 'hi', label: 'Hindi' },
            { value: 'bn', label: 'Bengali' },
            { value: 'ko', label: 'Korean' },
            { value: 'it', label: 'Italian' },
            { value: 'nl', label: 'Dutch' },
            { value: 'pl', label: 'Polish' },
            { value: 'th', label: 'Thai' },
            { value: 'sv', label: 'Swedish' },
            { value: 'vi', label: 'Vietnamese' },
            { value: 'sw', label: 'Swahili' },
            { value: 'pa', label: 'Punjabi' },
            { value: 'uk', label: 'Ukrainian' },
            { value: 'fa', label: 'Persian' },
            { value: 'ro', label: 'Romanian' },
            { value: 'hu', label: 'Hungarian' },
            { value: 'fi', label: 'Finnish' },
            { value: 'sk', label: 'Slovak' },
          ]}
        />

      </div>
      <hr className='mb-4'></hr>
      <h4 className="mb-6 text-lg font-medium text-default-900">Resten af info:</h4>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <TextFormInput name="duration" type="text" label="Duration" placeholder="Enter how long it takes to make a pizza ish" control={control} fullWidth />
        <TextFormInput name="minDelivery" type="number" label="Min Delivery" min={50} placeholder="Enter min price for Delivery" control={control} fullWidth />
        <input name="logo" hidden value={logoLink} />
        <input name="bgBackground" hidden value={bgBackground} />

        <div className="rounded-lg border border-default-200 p-6">
          <h4 className="mb-4 text-base font-medium text-default-800">Additional Images</h4>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-default-200 p-6">
              <h4 className="mb-4 text-base font-medium text-default-800">Logo Image</h4>
              <div className="flex">
                <FilePond
                  server={{
                    process: {
                      url: BASE_URL + '/attachment/upload/logo-images', // replace with your server endpoint
                      headers: {
                        Authorization: `Bearer ${session?.access_token}`
                      },
                      onload: (response) => {
                        const filename = 'https://foodbyhome.dk/logo-images' + JSON.parse(response).filename
                        setLogoLink(filename)
                        return response
                      },
                    }
                  }}
                  className="h-24 w-24 p-0"
                  labelIdle='<div class="lg:mt-4 md:mt-5 sm:mt-6 mt-7">Upload Image</div>'
                  imageCropAspectRatio="1:1"
                  styleButtonRemoveItemPosition="center bottom"
                />
                {logoLink && <img src={logoLink} className='ml-4' height={100} width={100}></img>}
              </div>
            </div>
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-default-200 p-6">
              <h4 className="mb-4 text-base font-medium text-default-800">Background Image</h4>
              <div className="flex">
                <FilePond
                  server={{
                    process: {
                      url: BASE_URL + '/attachment/upload/bg-images', // replace with your server endpoint
                      headers: {
                        Authorization: `Bearer ${session?.access_token}`
                      },
                      onload: (response) => {
                        const filename = 'https://foodbyhome.dk/bg-images' + JSON.parse(response).filename
                        setBgLink(filename)
                        return response
                      },
                    },
                  }}
                  className="h-24 w-24 p-0"
                  labelIdle='<div class="lg:mt-4 md:mt-5 sm:mt-6 mt-7">Upload Image</div>'
                  imageCropAspectRatio="1:1"
                  styleButtonRemoveItemPosition="center bottom"
                />
                {bgBackground && <img src={bgBackground} className='ml-4' height={100} width={100}></img>}
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            type="button"
            data-hs-overlay="#hs-basic-modal"
            className="flex w-50 h-10 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary-500"
          >
            <LuPen size={20} />
            Create a times
          </button>
          <div
            id="hs-basic-modal"
            className={`hs-overlay ${isModalVisible ? '' : 'hidden'} hs-overlay hidden w-full h-full fixed top-0 left-0 z-[70] overflow-x-hidden overflow-y-auto`}
          >
            <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 opacity-0 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
              <div className="flex flex-col bg-white border border-default-200 shadow-sm rounded dark:bg-default-50">
                <div className="flex justify-between items-center py-3 px-4">
                  <h3 className="font-bold text-default-800">
                    Create Time Frame
                  </h3>
                  <button
                    type="button"
                    id="closeModal"
                    className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                    data-hs-overlay="#hs-basic-modal"
                  >
                    <span className="sr-only">Close</span>
                    <LuX size={24} />
                  </button>
                </div>
                <div className="flex p-4 overflow-y-auto">
                  <DatePicker
                    className="mr-3 block mt-2 w-full rounded-lg border border-default-200 bg-transparent px-4 py-2 dark:bg-default-50"
                    placeholder="From"
                    onChange={(dates) => {
                      // Assuming you want to format the date to a time string 'HH:mm'
                      if (dates.length > 0 && dates[0]) {
                        const timeString = dates[0].toLocaleTimeString('en-GB', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                        });
                        setTimeFrom(timeString);
                      }
                    }}
                    options={{
                      time_24hr: true,
                      defaultHour: 24,
                      enableTime: true,
                      noCalendar: true,
                      dateFormat: 'H:i',
                    }}
                  />
                  <DatePicker
                    className="block mt-2 w-full rounded-lg border border-default-200 bg-transparent px-4 py-2 dark:bg-default-50"
                    placeholder="To"
                    onChange={(dates) => {
                      // Assuming you want to format the date to a time string 'HH:mm'
                      if (dates.length > 0 && dates[0]) {
                        const timeString = dates[0].toLocaleTimeString('en-GB', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                        });
                        setTimeTo(timeString);
                      }
                    }}
                    options={{
                      time_24hr: true,
                      defaultHour: 24,
                      enableTime: true,
                      noCalendar: true,
                      dateFormat: 'H:i',
                    }}
                  />
                </div>
                <div className="flex h-5 items-center mb-5 ml-4 mr-4">
                  <select onChange={(e) => setWorkingDay(e.target.value)} className="form-select form-select-sm rounded-lg border border-default-200 bg-transparent px-4 py-2 dark:bg-default-50">
                    <option value="">Select Day</option>
                    <option value="1">Monday</option>
                    <option value="2">Tuesday</option>
                    <option value="3">Wednesday</option>
                    <option value="4">Thursday</option>
                    <option value="5">Friday</option>
                    <option value="6">Saturday</option>
                    <option value="7">Sunday</option>
                  </select>
                  <input
                    id="hs-table-search-checkbox-all"
                    type="checkbox"
                    onChange={(e) => setWorkingAfterMidNight(e.target.checked)}
                    className="form-checkbox h-5 w-5 mr-2 ml-5 rounded border border-default-300 bg-transparent text-primary focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0"
                  />
                  <label htmlFor="hs-table-search-checkbox-all">
                    WORKING AFTER MIDNIGHT
                  </label>
                </div>
                <div className="flex justify-end items-center gap-2 p-4 ">
                  <button
                    className="py-2 px-5 inline-flex font-semibold tracking-wide align-middle duration-500 text-sm text-center bg-default-100 text-default-800 transition-all rounded-lg"
                    type="button"
                    data-hs-overlay="#hs-basic-modal"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleSaveAndClose}
                    className="py-2 px-5 inline-flex font-semibold tracking-wide align-middle duration-500 text-sm text-center bg-primary text-white rounded-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <table className="divide-y w-full mt-5">
            <thead className="bg-default-400/10">
              <tr>
                <th scope="col" className="px-5 py-3 text-start text-xs font-medium uppercase text-default-500">
                  From
                </th>
                <th scope="col" className="px-5 py-3 text-start text-xs font-medium uppercase text-default-500">
                  To
                </th>
                <th scope="col" className="px-5 py-3 text-start text-xs font-medium uppercase text-default-500">
                  DayOfWeek
                </th>
                <th scope="col" className="px-5 py-3 text-center text-xs font-medium uppercase text-default-500">
                  Working After Midnight
                </th>
                <th scope="col" className="px-5 py-3 text-center text-xs font-medium uppercase text-default-500">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {tempTimeFrame.map((frame, index) => (
                <tr key={index}>
                  <td className="px-5 py-3 text-sm text-default-700">{frame.from}</td>
                  <td className="px-5 py-3 text-sm text-default-700">{frame.to}</td>
                  <td className="px-5 py-3 text-sm text-default-700">{frame.dayOfWeek}</td>
                  <td className="px-5 py-3 text-center text-sm text-default-700">
                    {frame.workingAfterMidnight ? 'Yes' : 'No'}
                  </td>
                  <td className="px-5 py-3 text-sm text-default-700">
                    <button
                      type="button"
                      className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center ml-7 h-5 w-5 rounded text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                      onClick={() => deleteTimes(index)}
                    >
                      <span className="sr-only">Close</span>
                      <LuX size={24} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      <div className="flex flex-wrap justify-end gap-4">
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary-500"
        >
          <LuSave size={20} />
          Save
        </button>
      </div>
    </form>
  )
}

export default BusinessDetailForm

