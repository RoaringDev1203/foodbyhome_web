import { Link } from 'react-router-dom'
import { useShoppingContext } from '@/context'
import { ProductWishListCard } from '@/components'
import { error404OtherImg } from '@/assets/data'

const AllWishList = () => {
  const { wishlists } = useShoppingContext()
  return !!wishlists.length ? (
    <>
      {wishlists.map((dish) => (
        <ProductWishListCard key={dish.id} dish={dish} />
      ))}
    </>
  ) : (
    <div className='flex flex-col items-center justify-center p-10'>
      <p className='text-3xl'>Add Products to wishlist and check again</p>
      <img src={error404OtherImg} width={250} height={250} alt="not-found-image" className="h-full max-w-full" />
      <Link to="/dishes" className='rounded-lg bg-primary px-6 py-3 text-base font-medium capitalize text-white transition-all hover:bg-primary-500 mx-auto inline-block'>Check Products</Link>
    </div>
  )
}

export default AllWishList
