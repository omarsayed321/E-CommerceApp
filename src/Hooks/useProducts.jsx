import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';

export default function useProducts() {

  async function getAllProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }
  const { data, isLoading } = useQuery({
    queryKey: 'allProducts',
    queryFn: getAllProducts,
    refetchOnWindowFocus: false
  })
  const allProductsData = data?.data.data;

  return { data, isLoading ,allProductsData}
}
