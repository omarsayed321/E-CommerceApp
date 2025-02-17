
import React, { useState } from 'react'
import useProducts from './../../Hooks/useProducts';
import { Bars } from 'react-loader-spinner';
import CompCard from '../CompCard/CompCard';
import Loader from '../Loader';

export default function Products() {

  const { data, isLoading, allProductsData } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = allProductsData?.filter((product) =>
    product.title?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return <>
    {isLoading ? <Loader /> : < div >

      {/* search input */}
      <div className="mx-auto w-4xl container p-6 mt-30">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
      </div>

      {/* display products */}

      < div className="mx-auto container">
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-6 gap-5'>
          {filteredProducts?.map((comp) => <CompCard product={comp} key={comp._id} />)}
        </div>
      </div >
    </div >
    }
  </>
}
