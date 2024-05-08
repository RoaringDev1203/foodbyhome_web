import { lazy, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { orderRows } from '../../../(order)/orders/page'
import { BreadcrumbAdmin, OrderDataTable } from '@/components'
import { getDriverById } from '@/helpers'
import type { ColumnType } from '@/types/util'
import type { OrderType } from '@/types/other'
import { DriverType } from '@/types/food'
const PersonDetailsCard = lazy(() => import('@/components/cards/PersonDetailsCard'))

const columns: Array<ColumnType<OrderType>> = [
  {
    key: 'date',
    name: 'Date',
  },
  {
    key: 'id',
    name: 'Order ID',
  },
  {
    key: 'dish_id',
    name: 'Dish',
  },
  {
    key: 'amount',
    name: 'Amount',
  },
  {
    key: 'status',
    name: 'Status',
  },
]

const DriverDetails = () => {
  const { sellerId } = useParams()

  const [seller, setDriver] = useState<DriverType>()

  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const foundDriver = await getDriverById(Number(sellerId))
      if (!foundDriver) {
        navigate('/not-found')
      } else {
        setDriver(foundDriver)
      }
    })()
  }, [sellerId])

  return (
    <div className="w-full lg:ps-64">
      <div className="page-content space-y-6 p-6">
        <BreadcrumbAdmin title="Drivers Details" link="/admin/drivers" subtitle="Drivers" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">

            {seller && <PersonDetailsCard seller={seller} />}

          </div>
          <div className="lg:col-span-2">
            <OrderDataTable<OrderType> title="Sales Order history" columns={columns} rows={orderRows} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DriverDetails
