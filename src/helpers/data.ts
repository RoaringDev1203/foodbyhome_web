import { sleep } from '@/utils'
import { calculatedPrice } from './product'
import { categoriesData, dishesData, orderHistoryData, restaurantsData, driversData } from '@/assets/data'
import type { CategoryType, DishType, RestaurantType } from '@/types/food'
import type { OrderType } from '@/types/other'
import type { FilterState } from '../types/state'
import { BASE_URL } from '@/common/constants'
import httpClient from './httpClient'

export const getFilteredProducts = (
  filter: Pick<FilterState, 'categories' | 'restaurants' | 'minPrice' | 'maxPrice' | 'rating' | 'search'>
): DishType[] => {
  const products: DishType[] = dishesData
  filter = filter ?? {}
  return products.filter((dish) => {
    return !(
      (filter.categories && !!filter.categories.length && !filter.categories.includes(dish.category_id)) ||
      (filter.restaurants && !!filter.restaurants.length && !filter.restaurants.includes(dish.restaurant_id)) ||
      (filter.minPrice && !(calculatedPrice(dish) >= filter.minPrice)) ||
      (filter.maxPrice && !(calculatedPrice(dish) <= filter.maxPrice)) ||
      (filter.search && !dish.name.toLowerCase().includes(filter.search.toLowerCase())) ||
      (filter.rating && !(dish.review.stars >= filter.rating))
    )
  })
}

export const getAllFoods = async (restaurant_id: string) => {
  // You can fetch your products from your server here
  const response = await httpClient.get(BASE_URL + '/food/restaurant/' + restaurant_id);
  console.log(response)
  return response.data

}

export const getAllCategories = async () => {
  // You can fetch data from your server here
  await sleep(200)
  return categoriesData
}

export const getAllRestaurants = async () => {
  // You can fetch data from your server here
  const response = await httpClient.get(BASE_URL + '/restaurant/');
  return response.data.result
}

export const getAllDrivers = async () => {
  // You can fetch data from your server here
  await sleep(200)
  return driversData
}

export const getAllOrders = async () => {
  await sleep(200)
  return orderHistoryData
}
export const getDishById = async () => {
  await sleep(200)
  return orderHistoryData
}


export const getFoodById = async (id: string) => {
  // You can fetch data from your server here
  const response = await httpClient.get(BASE_URL + '/food/' + id);
  return response.data
}

export const getCategoryById = async (id: CategoryType['id']) => {
  // You can fetch data from your server here
  await sleep(200)
  return categoriesData.find((category) => category.id == id)
}

export const getRestaurantById = async (id: string) => {
  // You can fetch data from your server here
  const response = await httpClient.get(BASE_URL + '/restaurant/' + id);
  return response.data

}

export const getDriverById = async (id: RestaurantType['id']) => {
  // You can fetch data from your server here
  await sleep(200)
  return driversData.find((seller) => seller.id == id)
}

export const getOrderById = async (id: OrderType['id']) => {
  // You can fetch data from your server here
  await sleep(200)
  return orderHistoryData.find((order) => order.id == id)
}

export const getOrderHistoryById = async (id: OrderType['id']) => {
  // You can fetch data from your server here
  await sleep(200)
  return orderHistoryData.find((order) => order.id == id)
}
