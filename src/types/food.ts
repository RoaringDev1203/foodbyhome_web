import { IdType } from './other'

export type CategoryType = {
  id: IdType
  name: string
  image: string
}

export type ReviewType = {
  count: number
  stars: number
}


export type SaleType = {
  ends_on: Date
} & (
    | {
      type: 'percent'
      discount: number
    }
    | {
      type: 'amount'
      discount: number
    }
  )

export type DishType = {
  id: IdType
  category_id: CategoryType['id']
  restaurant_id: RestaurantType['id']
  category?: CategoryType
  restaurant?: RestaurantType
  name: string
  images: string[]
  tags: string[]
  sale?: SaleType
  is_popular?: boolean
  is_new?: boolean
  price: number
  review: ReviewType
  quantity: number
  type: 'veg' | 'non-veg' | 'eggetarian'
}

export type DriverType = {
  id: IdType
  name: string
  photo: string
  contact_no: number
  email: string
  location: string
  order_total: number
  orders: number
  joining_date: string
  joining_time: string
  status: 'active' | 'blocked'
}

export type RestaurantType = {
  id: IdType
  seller_id: DriverType['id']
  seller?: DriverType
  name: string
  logo: string
  categories: CategoryType['id'][]
  total_dishes: number
  total_sales: number
  address: string
  email: string
  contact_no: number
}
type Individual = {
  individual_firstname: string;
  individual_lastname: string;
  individual_phone: string;
  individual_email: string;
  individual_address: string;
  individual_city: string;
  individual_postal_code: string;
  individual_cpr: string;
  individual_dob: string; // Date as string, assuming ISO format
  account_number: string;
  account_holder_name: string;
}

export type RestaurantApiType = {
  id: string;
  restaurant_name?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  bgBackground?: string;
  openingHours?: string[]; // Assuming opening hours are represented as strings
  deliveryTime?: string;
  restaurantStripeId?: string;
  logo?: string;
  minDelivery?: string;
  duration?: string;
  deliveryCost?: string;
  priceRating?: string;
  rating?: number;
  amountOfRating?: number;
  phone?: string;
  status?: string;
  category?: string[]; // Assuming category is an array of strings
  language?: string;
  cvr?: number;
  individual_data: Individual;
  created_at: string;
}

export type Addon = {
  name: string;
  price: number;
  type: string;
}

export type Food = {
  name: string;
  description: string;
  price: string;
  duration: string;
  category: string;
  addons: Addon[];
  restaurant_id?: string; // The '?' makes the field optional
}