
import { LuMoreVertical } from 'react-icons/lu'
import { DemoFilterDropdown, GoToAddButton } from '../index'
import type { Food } from '@/types/food'

type RestaurantMenuDataTableProps = {
  rows: Food
  title: string
  buttonText: string
  buttonLink: string
}

const RestaurantMenuDataTable = ({
  buttonLink,
  buttonText,
  rows,
  title,
}: RestaurantMenuDataTableProps) => {
  console.log(rows)
  return (
    <div className="overflow-hidden rounded-lg border border-default-200">
      <div className="border-b border-b-default-200 p-6">
        <h4 className="mb-4 text-xl font-medium text-default-900">{title}</h4>
        <div className="flex flex-wrap items-center gap-4">
          <DemoFilterDropdown filterOptions={['Best Driver', 'High to Low', 'Low to High']} filterType="Popular" />
          <DemoFilterDropdown filterOptions={['Newest', 'Oldest']} filterType="Upload Date" />
          <DemoFilterDropdown filterOptions={['Average', 'Good', 'Best']} filterType="Rating" />
          <div className="ms-auto">
            <GoToAddButton buttonLink={buttonLink} buttonText={buttonText} />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="divide-y divide-default-200 rounded-lg">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-default-200">
                <thead className="bg-default-100/75">
                  <tr>
                    <th scope="col" className="px-4 py-3 pr-0">
                      <div className="flex h-5 items-center">
                        <input
                          id="hs-table-search-checkbox-all"
                          type="checkbox"
                          className="form-checkbox h-5 w-5 rounded border border-default-300 bg-transparent text-primary focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0"
                        />
                        <label htmlFor="hs-table-search-checkbox-all" className="sr-only">
                          Checkbox
                        </label>
                      </div>
                    </th>
                    <th scope="col" className="whitespace-nowrap px-6 py-3 text-start text-base font-medium text-default-500">
                      Food name
                    </th>
                    <th scope="col" className="whitespace-nowrap px-6 py-3 text-start text-base font-medium text-default-500">
                      Category
                    </th>
                    <th scope="col" className="whitespace-nowrap px-6 py-3 text-start text-base font-medium text-default-500">
                      Price
                    </th>
                    <th scope="col" className="whitespace-nowrap px-6 py-3 text-start text-base font-medium text-default-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-default-200">
                  {rows.map((food, idx) => {
                    return (
                      <tr key={idx}>
                        <td className="py-3 pl-4">
                          <div className="flex h-5 items-center">
                            <input
                              id="hs-table-search-checkbox-1"
                              type="checkbox"
                              className="form-checkbox h-5 w-5 rounded border border-default-300 bg-transparent text-primary focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0"
                            />
                            <label htmlFor="hs-table-search-checkbox-1" className="sr-only">
                              Checkbox
                            </label>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-start gap-3">
                            <h5 className="text-base font-medium text-default-700">{food.name}</h5>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-start gap-3">
                            <h5 className="text-base font-medium text-default-700">{food.category}</h5>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4" >
                          <div className="flex items-start gap-3">
                            <h5 className="text-base font-medium text-default-700">{food.price} ,-</h5>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 ">
                          <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
                            <button type="button" className="hs-dropdown-toggle inline-flex font-medium text-default-600 transition-all">
                              <LuMoreVertical size={22} />
                            </button>
                            <div className="hs-dropdown-menu z-20 mt-4 hidden min-w-[150px] rounded-lg border border-default-100 bg-white p-1.5 opacity-0 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] transition-[opacity,margin] hs-dropdown-open:opacity-100 dark:bg-default-50">
                              <ul className="flex flex-col gap-1">
                                <li>
                                  <a href={"/admin/edit-dish/" + food.id} target="_blank" rel="noopener noreferrer">
                                    <button className="flex w-full items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700">
                                      Edit
                                    </button>
                                  </a>
                                </li>
                                <li>
                                  <button className="flex w-full items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700">
                                    View
                                  </button>
                                </li>
                                <li>
                                  <button className="flex w-full items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700">
                                    Delete
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantMenuDataTable
