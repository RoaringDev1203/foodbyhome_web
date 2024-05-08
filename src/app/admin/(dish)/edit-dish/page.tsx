
import { useParams } from 'react-router-dom';
import EditDishForm from './EditDishForm'
import { BreadcrumbAdmin } from '@/components'


const EditProduct = () => {
  const { foodId } = useParams();

  return (
    <div className="w-full lg:ps-64">
      <div className="page-content space-y-6 p-6">
        <BreadcrumbAdmin title="Edit Dish" subtitle="Dishes" link="/admin/dishes" />
        <EditDishForm foodId={foodId} />
      </div>
    </div>
  )
}

export default EditProduct
