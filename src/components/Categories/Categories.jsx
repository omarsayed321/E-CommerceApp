import React, { useState } from 'react';
import useCategories from './../../Hooks/useCategories';
import Loader from '../Loader';

export default function Categories() {
  const { catData, catLoading, allCatData } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState(null); 
  return (
    <>
      {catLoading ? (
        <Loader />
      ) : (
        <div className="container mt-30 my-5 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 space-x-5">
            {allCatData?.map((cat) => (
              <button key={cat._id} onClick={() => setSelectedCategory(cat)} className="cursor-pointer">
                <div className="comp-card text-center">
                  <img className="w-full h-[400px] object-cover" src={cat.image} alt={cat.name} />
                  <h2 className="text-3xl my-5 tracking-tight text-[#4fa74f]">{cat.name}</h2>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Transparent Modal */}
      {selectedCategory && (
        <div className=" fixed mt-20 inset-0 flex items-center justify-center bg-black/50 bg-opacity-40 ">
          <div className="bg-white p-6 rounded-lg w-[40rem] min-h-[25rem]  text-center border border-gray-300">
            <img className="mx-auto mt-5 mb-4 rounded-lg shadow-md w-60 h-60" src={selectedCategory.image} alt={selectedCategory.name} />
            <h2 className="text-lg font-bold text-gray-800">{selectedCategory.name}</h2>
            <p className="text-gray-700 mt-2">More details about {selectedCategory.name}.</p>
            <button
              onClick={() => setSelectedCategory(null)}
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
