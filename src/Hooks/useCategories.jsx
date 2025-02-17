import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

export default function useCategories() {

  async function getCatProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
  const { data:catData,isLoading:catLoading} = useQuery({
    queryKey: 'allCatProducts',
    queryFn: getCatProducts,
    refetchOnWindowFocus: false
  })
  const allCatData = catData?.data.data;

  return {catData,catLoading,allCatData}
}
