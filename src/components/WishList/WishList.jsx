import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { WishListContext } from '../../context/WishListContext';
import { CartContext } from '../../context/CartContext';

export default function WishList() {
  const { getWishItems, deleteWishItem, allWishDetails, productDetails, totalWishCount } = useContext(WishListContext);
  const { addToCart } = useContext(CartContext);


  useEffect(() => {
    getWishItems();
  }, []); 

  return (
    <div className="mx-auto container mt-30">
      <div className="row">
        <div className="my-10 mx-7 p-10 bg-[#F8F9FA] relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex justify-between items-center w-full">
            <h2 className="my-3 font-semibold text-4xl text-black">My Wish List</h2>
            <h2 className="my-3 font-semibold text-xl capitalize text-black">
              Total number of items: <span className="text-[#22DB14]">{totalWishCount}</span>
            </h2>
          </div>

          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <tbody>
              {productDetails.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center font-semibold text-3xl text-black p-5">
                    Your WishList Is Empty
                  </td>
                </tr>
              ) : (
                productDetails.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td>
                      <div className="w-32 my-3 me-10">
                        <img src={item.imageCover} className="w-32 max-h-full" alt={item.title} />
                      </div>
                    </td>
                    <td className="max-w-sm text-lg font-semibold text-left text-gray-900">
                      {item.title}
                      <h3 className="my-3 text-[#22a119] font-semibold">{item.price} EGP</h3>
                      <button
                        onClick={() => deleteWishItem(item.id)}
                        className="cursor-pointer font-medium text-red-600"
                      >
                        <i className="fa fa-trash text-red-600 mr-2"></i> Remove
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => addToCart(item.id)}
                        type="button"
                        className="text-black hover:text-white border border-[#22DB14] hover:bg-[#22DB14] font-medium rounded-lg text-md px-7 py-3.5 text-center me-2 mb-2"
                      >
                        Add To Cart
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
