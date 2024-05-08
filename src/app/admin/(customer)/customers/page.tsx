
import { BreadcrumbAdmin, CustomerDataTable } from '@/components'
import type { DriverType } from '@/types/food'
import type { ColumnType } from '@/types/util'

//data
import { driversData } from '@/assets/data'

const CustomersList = () => {
  const columns: Array<ColumnType<DriverType>> = [
    {
      key: 'name',
      name: 'Name',
    },
    {
      key: 'contact_no',
      name: 'Phone',
    },
    {
      key: 'email',
      name: 'Email',
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
        <BreadcrumbAdmin title="Customers List" subtitle="Customers" />

        <CustomerDataTable<DriverType>
          rows={driversData}
          columns={columns}
          title="Customers"
          buttonText="Add a new Customer"
          buttonLink="/admin/add-customer"
        />
      </div>
    </div>
  )
}

export default CustomersList
