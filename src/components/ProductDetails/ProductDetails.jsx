import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { data, useParams } from 'react-router-dom'
import CompCard from '../CompCard/CompCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useQuery } from 'react-query';
import { Bars } from 'react-loader-spinner';
import { CartContext } from '../../context/CartContext';
import { WishListContext } from '../../context/WishListContext';

export default function ProductDetails() {

  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { addToWishList} = useContext(WishListContext);
  // const [details, setDetails] = useState();

  async function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    // console.log(data.data);
    // setDetails(data.data);
  }
  // useEffect(() => {
  //   getProductDetails()
  // }, [])

  const { data, isLoading } = useQuery({
    queryKey: 'productDetails',
    queryFn: getProductDetails,
    refetchOnWindowFocus: false,
    cacheTime: 0
  })

  const details = data?.data.data;

  return <>

    {isLoading ? <div className='loader'>
      <Bars
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div> : <div className="container mt-30 mx-auto ">
      <div className="grid grid-cols-6 ">
        <div className="col-span-2 w-full">
          <Swiper slidesPerView={1} loop={true} style={{ height: '80%' }} >
            {details?.images.map((img) => <SwiperSlide key={img}><img className='w-full py-5  ' src={img} alt={details?.title} /></SwiperSlide>)}
          </Swiper>
        </div>
        <div className="col-span-4">
          <div className="px-5 pt-30">

            <div>
              <h2 className='font-semibold my-2 text-3xl'>{details?.title}</h2>
              <p>{details?.description}</p>
            </div>

            <div className="flex  items-center justify-between mt-3.5 ms-auto">
              <div>
                <span>{details?.price} EGP</span>
              </div>
              <div className="flex items-center justify-center space-x-1  rtl:space-x-reverse">
                <svg className="w-5 h-5 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm ">{details?.ratingsAverage}</span>
              </div>
            </div>

            <div className='flex justify-center justify-items-center align-middle my-8 py-5'>
              <div className='ms-auto'>
              </div>
                <button onClick={(event) => {
                  addToWishList(details._id);
                  const icon = event.currentTarget.querySelector("i");
                  icon.classList.toggle("text-red-600");
                }} className=' cursor-pointer flex justify-center align-middle mt-2.5 '>
                  <div className='ms-[15rem]'>
                    <i className='fa-solid fa-heart fa-xl'></i>
                  </div>
                </button>
              <button onClick={() => addToCart(details._id)} className="comp-card-button mx-auto my-0 w-[20rem] bg-[#22db14] ">
                Add to cart
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>}


  </>
}
