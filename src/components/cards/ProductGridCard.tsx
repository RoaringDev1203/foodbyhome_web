
import { Link } from 'react-router-dom'
import { lazy } from 'react'
import { FaStar } from 'react-icons/fa6'
import { currentCurrency } from '@/common'
import { calculatedPrice } from '@/helpers'
import type { DishType } from '@/types/food'
const AddToFavouriteButton = lazy(() => import('../shopping-interactivity/ProductWishlistToggler'))
const ProductQuantityToggler = lazy(() => import('../shopping-interactivity/ProductQuantityToggler'))
const AddToCartButton = lazy(() => import('../shopping-interactivity/AddToCartButton'))

const ProductGridCard = ({ dish }: { dish: DishType }) => {
  const { images, name, review, id } = dish

  const discountedPrice = calculatedPrice(dish)

  return (
    <div className="order-3 overflow-hidden rounded-lg border border-default-200 p-4 transition-all duration-300 hover:border-primary hover:shadow-xl">
      <div className="group relative divide-y divide-default-200 overflow-hidden rounded-lg">
        <div className="mx-auto mb-4">
          <img width={339} height={263} src={images[0]} alt={name} className="h-full w-full transition-all group-hover:scale-105" />
        </div>
        <div className="pt-2">
          <div className="mb-4 flex items-center justify-between">
            <Link className="line-clamp-1 text-xl font-semibold text-default-800 after:absolute after:inset-0" to={`/dishes/${id}`}>
              {name}
            </Link>

            <AddToFavouriteButton dish={dish} />
          </div>
          <span className="mb-4 inline-flex items-center gap-2">
            <span className="rounded-full bg-primary p-1">
              <FaStar size={12} className="fill-white text-white" />
            </span>
            <span className="from-inherit text-sm text-default-950">{review.stars}</span>
          </span>
          <div className="mb-4 flex items-end justify-between">
            <h4 className="text-2xl font-semibold leading-9 text-default-900">
              {currentCurrency}
              {discountedPrice}
            </h4>

            <ProductQuantityToggler dish={dish} />
          </div>

          <AddToCartButton dish={dish} className='!w-full' />
        </div>
      </div>
    </div>
  )
}

export default ProductGridCard
