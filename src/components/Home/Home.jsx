import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CompCard from '../CompCard/CompCard';
import { Bars } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import slider1 from '../../assets/images/slider-image-1.jpeg'
import slider2 from '../../assets/images/slider-image-2.jpeg'
import blog1 from '../../assets/images/blog-img-1.jpeg'
import blog2 from '../../assets/images/blog-img-2.jpeg'
import useCategories from './../../Hooks/useCategories';
import useProducts from '../../Hooks/useProducts';
import Loader from '../Loader';

export default function Home() {
  const { catData, catLoading ,allCatData} = useCategories();
  const { data, isLoading, allProductsData } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = allProductsData?.filter((product) => 
    product.title?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return <>
    {isLoading && catLoading ? <Loader/> : <>
      {/* slider */}

      <div className="container mt-30 mx-auto">
        <div className="grid grid-cols-6 ">
          <div className=" col-span-4">
            <Swiper slidesPerView={1} loop={true} style={{ height: '100%' }} >
              <SwiperSlide><img src={slider1} className='w-full h-full block' alt="slider 1" /></SwiperSlide>
              <SwiperSlide><img src={slider2} className='w-full h-full block' alt="slider 2" /></SwiperSlide>
            </Swiper>
          </div>
          <div className=" col-span-2" >
            <img src={blog1} className='h-1/2 object-cover' alt="blog img 1" />
            <img src={blog2} className='h-1/2 object-cover' alt="blog img 2" />
          </div>
        </div>
      </div>
      {/* slider */}

      {/* categories slider */}

      <Swiper slidesPerView={6} loop={true} style={{ height: '100%' }} >
        {allCatData?.map((cat) => <SwiperSlide key={cat._id}>
          <img className=' my-5 h-[250px] w-full object-cover' src={cat.image} alt={cat.name} />
          <h2 className='font-semibold text-2xl'>{cat.name}</h2>
        </SwiperSlide>)}
      </Swiper>

      {/* categories slider */}

      {/* search input */}
      <div className="mx-auto w-4xl mt-6 container p-6 pb-0 mb-0">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2  border border-gray-300 rounded"
        />
      </div>
      
      {/* display products*/}
      <div className="mx-auto container">
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-6 gap-5'>
          {filteredProducts.map((comp) => <CompCard product={comp} key={comp._id} />)}
        </div>
      </div>
      {/* display products*/}
    </>
    }
  </>
}
