
import type { DriverType } from '@/types/food'
import type { ColumnType } from '@/types/util'
import { BreadcrumbAdmin, CustomerDataTable } from '@/components'
import { driversData } from '@/assets/data'

const DriverList = () => {
  const columns: Array<ColumnType<DriverType>> = [
    {
      key: 'name',
      name: 'Customer Name',
    },
    {
      key: 'email',
      name: 'Email',
    },
    {
      key: 'contact_no',
      name: 'Phone',
    },
    {
      key: 'orders',
      name: 'Orders',
    },
    {
      key: 'order_total',
      name: 'Order Total',
    },
    {
      key: 'joining_date',
      name: 'Customer Since',
    },
    {
      key: 'status',
      name: 'Status',
    },
  ]
  return (
    <div className="w-full lg:ps-64">
      <div className="page-content space-y-6 p-6">
        <BreadcrumbAdmin title="Drivers List" subtitle="Drivers" />
        <CustomerDataTable<DriverType>
          rows={driversData}
          columns={columns}
          title="Drivers"
          buttonText="Add new Drivers"
          buttonLink="/admin/add-seller"
        />
      </div>
    </div>
  )
}

export default DriverList
