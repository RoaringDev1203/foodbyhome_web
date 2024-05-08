
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { LuPen, LuSave, LuX } from 'react-icons/lu'
import { SelectFormInput, TextAreaFormInput, TextFormInput } from '@/components'

//style
import 'react-quill/dist/quill.snow.css'
import { BASE_URL, foodCategory } from '@/common/constants'
import httpClient from '@/helpers/httpClient'
import { Addon } from '@/types/food'
import { useState } from 'react'

const AddDishForm = (restaurantId?: string) => {
  const [tempAddon, setTempAddon] = useState<Addon[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [foodName, setFoodName] = useState('');
  const [foodType, setType] = useState('');
  const [foodPrice, setPrice] = useState(0);
  const foodCategoryOptions = Object.values(foodCategory).map(category => ({
    value: category,
    label: category
  }));

  const credentialsManagementFormSchema = yup.object({
    name: yup.string().required('Please enter your product name'),
    description: yup.string().required('Please enter your description'),
    price: yup.number().required('Please enter your price'),
    category: yup.object().required('Please select your product catagory'),
    duration: yup.number().required('Type Duration'),
  })

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(credentialsManagementFormSchema),
  })

  const onSubmit = async (data: any) => {
    console.log('dasdasoidjoas')
    try {
      const transformedData = {
        ...data,
        category: data.category.value,
        addons: tempAddon,
        restaurant_id: restaurantId
      };
      const response = await httpClient.post(`${BASE_URL}/food/create`, transformedData);
      console.log(response.data.code);
      if (response.data.code == 200) {
        window.location.href = "/admin/restaurants/" + restaurantId;
      }
      // Handle success (e.g., show a success message or redirect)
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show an error message)
    }
  };

  const deleteAddon = (index: Number) => {
    setTempAddon(tempAddon.filter((_, i) => i !== index));
  }

  const closeModal = () => {
    // Close the modal dialog
    const modal = document.getElementById('closeModal');
    if (modal) {
      modal.click()
    }
  };

  const handleSaveAndClose = () => {
    createAddon();
    closeModal()
  };


  const createAddon = () => {
    const newAddon: Addon = {
      name: foodName,
      type: foodType,
      price: foodPrice
    };

    setTempAddon([...tempAddon, newAddon]);
  };



  return (
    <div className="xl:col-span-2">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="rounded-lg border border-default-200 p-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <TextFormInput name="name" type="text" label="Product Name" placeholder="Product Name" control={control} fullWidth />
              <SelectFormInput
                name="category"
                label="Product Catagory"
                id="product-catagory"
                instanceId="product-catagory"
                control={control}
                options={foodCategoryOptions}
                fullWidth
              />
              <div className="grid gap-6 lg:grid-cols-2">
                <TextFormInput name="price" type="text" label="Cost Price" placeholder="Cost Price" control={control} fullWidth />
                <TextFormInput name="duration" type="number" label="Duration" placeholder="How long does it take mto make" control={control} fullWidth />
              </div>
            </div>
            <div className="space-y-6">
              <TextAreaFormInput name="description" label="Description" placeholder="short Description" rows={5} control={control} fullWidth />
              <div>
                <button
                  type="button"
                  data-hs-overlay="#hs-basic-modal"
                  className="flex w-50 h-10 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary-500"
                >
                  <LuPen size={20} />
                  Create a addon
                </button>
                <div
                  id="hs-basic-modal"
                  className={`hs-overlay ${isModalVisible ? '' : 'hidden'} hs-overlay hidden w-full h-full fixed top-0 left-0 z-[70] overflow-x-hidden overflow-y-auto`}
                >
                  <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 opacity-0 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                    <div className="flex flex-col bg-white border border-default-200 shadow-sm rounded dark:bg-default-50">
                      <div className="flex justify-between items-center py-3 px-4">
                        <h3 className="font-bold text-default-800">
                          Create Addons
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
                        <input onChange={(e) => setFoodName(e.target.value)} className="rounded-lg border border-default-200 px-4 py-2.5 bg-white" placeholder="Addon name"></input>
                        <input onChange={(e) => setPrice(Number(e.target.value))} className="rounded-lg border border-default-200 px-4 py-2.5 ml-3 bg-white" type="number" placeholder="Addon price"></input>
                      </div>
                      <div className="flex h-5 items-center mb-5 ml-4 mr-4">
                        <select onChange={(e) => setType(e.target.value)} className="form-select form-select-sm rounded-lg border border-default-200 bg-transparent px-4 py-2 w-40 dark:bg-default-50">
                          <option value="">Select Type</option>
                          <option value="mad">mad</option>
                          <option value="drink">drink</option>
                        </select>

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
                          type="button" // Add this line
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
                        Food Name
                      </th>
                      <th scope="col" className="px-5 py-3 text-start text-xs font-medium uppercase text-default-500">
                        Food price
                      </th>
                      <th scope="col" className="px-5 py-3 text-start text-xs font-medium uppercase text-default-500">
                        Food type
                      </th>
                      <th scope="col" className="px-5 py-3 text-center text-xs font-medium uppercase text-default-500">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {tempAddon.map((addon, index) => (
                      <tr key={index}>
                        <td className="px-5 py-3 text-sm text-default-700">{addon.name}</td>
                        <td className="px-5 py-3 text-sm text-default-700">{addon.price}</td>
                        <td className="px-5 py-3 text-sm text-default-700">{addon.type}</td>

                        <td className="px-5 py-3 text-sm text-default-700">
                          <button
                            type="button"
                            className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center ml-7 h-5 w-5 rounded text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                            onClick={() => deleteAddon(index)}
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
          </div>
        </div>
        <div className="">
          <div className="flex flex-wrap items-center justify-end gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary-500"
              >
                <LuSave size={20} />
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddDishForm
