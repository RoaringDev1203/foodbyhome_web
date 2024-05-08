import React, { useState, useEffect } from 'react';
import { BreadcrumbAdmin, ProductPagination, RestaurantListCard } from '@/components';
import { getAllRestaurants } from '@/helpers/data';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  // Async function to fetch restaurant data
  const fetchRestaurants = async () => {
    try {
      const response = await getAllRestaurants()
      setRestaurants(response); // Assuming the data is in response.data
    } catch (error) {
      console.error('Failed to fetch restaurants:', error);
      // Handle error appropriately
    }
  };

  // useEffect to call the fetch function when the component mounts
  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <div className="w-full lg:ps-64">
      <div className="page-content space-y-6 p-6">
        <BreadcrumbAdmin title="Restaurants List" subtitle="Restaurants" />
        <div className="mb-6 grid gap-6 md:grid-cols-2 2xl:grid-cols-4">
          {restaurants.map(restaurant => (
            <RestaurantListCard restaurant={restaurant}></RestaurantListCard>
          ))}
        </div>
        <ProductPagination />
      </div>
    </div>
  );
};

export default RestaurantList;
