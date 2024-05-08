
import { BreadcrumbAdmin } from '@/components'
import AddDishForm from './AddDishForm'
import DishUploader from './DishUploader'
import { useParams } from 'react-router-dom';


const AddProduct = () => {
  const { restaurantId } = useParams();

  return (
    <div className="w-full lg:ps-64">
      <div className="page-content space-y-6 p-6">
        <BreadcrumbAdmin title="Add Dish" subtitle="Dishes" />
        <div className="grid gap-6 xl:grid-cols-3">
          <div>
            <DishUploader />
          </div>
          {AddDishForm(restaurantId)}
        </div>
      </div>
    </div>
  )
}

export default AddProduct
