
import EditDriverForm from './EditDriverForm'
import { BreadcrumbAdmin } from '@/components'


const EditDriver = () => {
  return (
    <div className="w-full lg:ps-64">
      <div className="page-content space-y-6 p-6">
        <BreadcrumbAdmin title="Edit Driver" subtitle="Driver" link="/admin/drivers" />
        <EditDriverForm />
      </div>
    </div>
  )
}

export default EditDriver
