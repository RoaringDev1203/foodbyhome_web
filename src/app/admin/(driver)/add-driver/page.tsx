
import AddDriverForm from './AddDriverForm'
import { BreadcrumbAdmin } from '@/components'

const AddDriver = () => {
  return (
    <div className="w-full lg:ps-64">
      <div className="page-content space-y-6 p-6">
        <BreadcrumbAdmin title="Add Driver" subtitle="Drivers" link="/admin/drivers" />
        <AddDriverForm />
      </div>
    </div>
  )
}

export default AddDriver
