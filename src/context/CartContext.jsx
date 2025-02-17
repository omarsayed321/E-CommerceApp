import axios from 'axios';
import React, { createContext, useState } from 'react'
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';


export const CartContext = createContext();
export default function CartContextProvider({ children }) {

  const [cartItems, setCartItems] = useState(null);
  const [productDetails, setproductDetails] = useState();
  const [totalProductsPrice, setTotalProductsPrice] = useState();
  const [totalProductsCount, setTotalProductsCount] = useState();
  const [allProductDetails, setAllProductDetails] = useState([]);
  const [cartId, setCartId] = useState();
  

  async function addToCart(productId = '') {
    try {
      const res = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', { productId }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
     
      
      if(res.data.status == 'success'){
        toast.success(res.data.message)
        setCartItems(res.data.numOfCartItems);
        
      }
      
    } catch (error) {
      toast.error('could not add your product :(')
      
      
    }

  }

  async function getCartItems(){

    try {
      const res = await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
        headers:{
          token:localStorage.getItem('token')
        }
      })
      
      setproductDetails(res.data.data);
      setTotalProductsPrice(res.data.data.totalCartPrice);
      setCartItems(res.data.numOfCartItems);
      setTotalProductsCount(res.data.numOfCartItems);
      setCartId(res.data.cartId);
      
      
      if(res.data.status == 'success'){

        setAllProductDetails(res.data.data.products)
      }
      
    } catch (error) {
      console.log(error);
      
      
    }    
  }

  async function updateCartItems(id,count){
    try {
    const res = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{
        headers:{
          token:localStorage.getItem('token')
        }
      })
     
      setTotalProductsPrice(res?.data.data.totalCartPrice);

     
      
      if(res.data.status == 'success'){
        setAllProductDetails(res.data.data.products)
      }

      

    } catch (error) {
      console.log(error);
      
    }
  }

  async function deleteCartItem(id){
    try {
      const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        headers:{
          token:localStorage.getItem('token')
        }
      })
     

      setTotalProductsCount(res.data.numOfCartItems);
      setTotalProductsPrice(res.data.data.totalCartPrice);
      setAllProductDetails(res.data.data.products);
      setCartItems(res.data.numOfCartItems);

      

    } catch (error) {
      console.log(error);
      
    }
  }

  async function clearCart(){
    try {
      const res = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{
        headers:{
          token:localStorage.getItem('token')
        }
      })
    
      
      if(res.data.message == "success"){

        setTotalProductsCount(0);
        setTotalProductsPrice(0);
        setAllProductDetails([]);
        setCartItems(null);
        getCartItems()
      }

    } catch (error) {
      console.log(error);
      
    }
  }




  return <CartContext.Provider value={{cartId, updateCartItems,addToCart,cartItems,getCartItems,allProductDetails,productDetails,totalProductsPrice,deleteCartItem,totalProductsCount,clearCart,setTotalProductsCount,setproductDetails }} >{children}</CartContext.Provider>
}
