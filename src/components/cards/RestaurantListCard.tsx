
import { Link } from 'react-router-dom'
import { LuMail, LuMapPin, LuPhone, LuStore } from 'react-icons/lu'
import type { RestaurantApiType } from '@/types/food'

const RestaurantListCard = ({ restaurant }: { restaurant: RestaurantApiType }) => {
  const { address, logo, individual_data, cvr, id, restaurant_name, status } = restaurant
  console.log(restaurant)
  const total_dishes = 10;
  const total_sales = 34;

  return (
    <div className="relative rounded-lg border border-default-200 p-6">
      <img src={logo} width={56} height={56} className="mx-auto mb-4 h-14 w-14" alt="restaurant" />
      <h4 className="text-center text-base font-medium uppercase text-default-900">{restaurant_name}</h4>
      <div className="mb-8 flex justify-around">
        <div className="text-center">
          <h4 className="mb-2.5 text-lg font-medium text-primary">{total_dishes}</h4>
          <h5 className="text-sm text-default-800">Total Product</h5>
        </div>
        <div className="border-s border-default-200" />
        <div className="text-center">
          <h4 className="mb-2.5 text-lg font-medium text-primary">{total_sales}</h4>
          <h5 className="text-sm text-default-800">Total Sales</h5>
        </div>
      </div>
      <div className="mb-6 space-y-5">
        <div className="flex gap-3">
          <div className="flex-shrink ">
            <LuStore size={20} className="text-default-800" />
          </div>
          <p className="d text-sm text-default-700">{status}</p>
        </div>
        <div className="flex gap-3">
          <div className="flex-shrink">
            <LuMapPin size={20} className="text-default-800" />
          </div>
          <p className="d text-sm text-default-700">{address}</p>
        </div>
        <div className="flex gap-3">
          <div className="flex-shrink">
            <LuMail size={20} className="text-default-800" />
          </div>
          <p className="d text-sm text-default-700">{individual_data.individual_email}</p>
        </div>
        <div className="flex gap-3">
          <div className="flex-shrink">
            <LuPhone size={20} className="text-default-800" />
          </div>
          <p className="d text-sm text-default-700">{cvr}</p>
        </div>
      </div>
      <div className="text-center">
        <Link
          to={`/admin/restaurants/${id}`}
          className="inline-flex rounded-lg bg-primary px-8 py-2.5 font-medium text-white transition-all hover:bg-primary-500"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default RestaurantListCard
