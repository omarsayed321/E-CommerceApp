import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loader from '../Loader';

export default function Brands() {
  const [selectedBrand, setSelectedBrand] = useState(null); 
  
  async function getAllBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands');
  }

  const { data, isLoading } = useQuery({
    queryKey: 'brandDetails',
    queryFn: getAllBrands,
    refetchOnWindowFocus: false
  });

  const details = data?.data?.data;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mx-auto mt-30 container text-center">
          <h2 className="text-[#4fa74f] font-semibold my-2 text-5xl">All Brands</h2>
          <div className="text-center grid grid-cols-4 p-6 gap-5">
            {details?.map((comp) => (
              <button key={comp._id} onClick={() => setSelectedBrand(comp)} className="cursor-pointer">
                <div className="border-gray-300 border hover:shadow-2xl">
                  <div>
                    <img className="p-8 rounded-t-lg w-full" src={comp?.image} alt={comp?.name} />
                  </div>
                  <div className="px-5 pb-5">
                    <h2 className="font-bold my-2 text-lg">{comp?.name}</h2>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Modal for Product Details */}
      {selectedBrand && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-70 ">
          <div className="bg-white p-6 rounded-lg max-w-md text-center border border-gray-300">
            <img className="mx-auto mb-4 rounded-lg shadow-md w-40 h-40" src={selectedBrand.image} alt={selectedBrand.name} />
            <h2 className="text-lg font-bold text-gray-800">{selectedBrand.name}</h2>
            <p className="text-gray-600 mt-2">Some additional details about {selectedBrand.name}.</p>
            <button
              onClick={() => setSelectedBrand(null)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
