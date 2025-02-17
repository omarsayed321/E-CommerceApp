import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';


export const WishListContext = createContext();
export default function WishListContextProvider({ children }) {

  const [wishItems, setWishItems] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  const [totalWishCount, setTotalWishCount] = useState();
  const [allWishDetails, setAllWishDetails] = useState([]);

  // get user id
  const [userId, setUserId] = useState();
  if (localStorage.getItem('token') != null) {

    useEffect(() => {
      setUserId(jwtDecode(localStorage.getItem('token')).id);
    }, [])
  }


  async function addToWishList(productId = '') {
    try {
      const res = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', { productId }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })



      if (res.data.status == 'success') {
        toast.success(res.data.message)
        setProductDetails(res.data.data);

        // setTotalWishCount(length(res.data))

      }

    } catch (error) {
      toast.error('could not add your product :(')


    }

  }

  async function getWishItems() {

    try {
      const res = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      setAllWishDetails(res.data);
      setTotalWishCount(res.data.count);

      if (res.data.status == 'success') {
        setProductDetails(res.data.data);



      }


    } catch (error) {
      console.log(error);


    }
  }


  async function deleteWishItem(id) {
    try {
      const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })


      if (res.data.status == "success") {
        getWishItems();

      }

      // setTotalWishCount(length(res.data));
      // setProductDetails(res.data.data.products);
      // setWishItems(res.data.numOfwishItems);



    } catch (error) {
      console.log(error);

    }
  }


  return <WishListContext.Provider value={{ allWishDetails, totalWishCount, addToWishList, getWishItems, deleteWishItem, productDetails, userId }} >{children}</WishListContext.Provider>
}
