import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../context/CartContext'
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {

  const { getCartItems, allProductDetails, updateCartItems, cartItems, totalProductsPrice, totalProductsCount, deleteCartItem, clearCart } = useContext(CartContext)
  useEffect(() => {
    getCartItems();
  }, [])

  const navigate = useNavigate();

  // async function checkOut() {

  // }

  const handleClearCart = (event) => {
    event.preventDefault();

    clearCart();

    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return <>

    <div className="mx-auto  container">
      <div className="row ">

        <div className="mt-35 mx-7 p-10 bg-[#F8F9FA] relative overflow-x-auto shadow-md sm:rounded-lg">


          <div className="flex justify-between justify-items-center align-baseline w-full">
            <h2 className='my-3 font-semibold text-4xl text-black'>Cart Shop</h2>
            <Link to={'/checkOut'}>
              <button type="button" className="w-full h-full text-white text-[18px] bg-[#22DB14] hover:bg-[#21db14e2] transition-all ease-in-out font-medium rounded-lg text-sm px-5 py-0  ">Check Out</button>
            </Link>
          </div>
          <div className="flex justify-between justify-items-center align-baseline w-full">
            <h2 className='my-3 font-semibold text-xl text-black'>Total Price: <span className='text-[#22DB14]'>{totalProductsPrice}</span> </h2>

            <h2 className='my-3 font-semibold text-xl capitalize text-black'>total number of items: <span className='text-[#22DB14]'>{totalProductsCount}</span> </h2>

          </div>



          {allProductDetails.length == 0 ? <h2 className='text-center font-semibold text-3xl my-2'>Your Cart Is Empty</h2> : <>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">

              <tbody>

                {allProductDetails?.map((item) => <tr key={item.product.id} className=" border-b border-gray-200 ">
                  <td >
                    <div className="w-32 my-3 me-10">

                      <img src={item.product.imageCover} className="w-32 max-h-full" alt={item.product.title} />
                    </div>
                  </td>
                  <td className=" text-lg font-semibold text-left text-gray-900 ">
                    {item.product.title}

                    <h3 className="my-3  font-semibold text-gray-900 ">
                      {item.price} EGP
                    </h3>

                    <button onClick={() => { deleteCartItem(item.product.id) }} href="#" className=" cursor-pointer  font-medium text-red-600">
                      <i className='fa fa-trash text-red-600 mr-2'></i>
                      Remove</button>

                  </td>
                  <td className="px-6 py-4">


                    <div className="flex items-center">
                      <button disabled={item.count == 1} onClick={() => updateCartItems(item.product.id, item.count - 1)} className="cart-add-btn" type="button">

                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                        </svg>
                      </button>
                      <div>
                        <span className="  text-gray-900 text-sm rounded-lg block px-2.5 py-1  ">
                          {item.count}
                        </span>
                      </div>
                      <button onClick={() => updateCartItems(item.product.id, item.count + 1)} className="cart-add-btn" type="button">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                        </svg>
                      </button>
                    </div>


                  </td>

                </tr>
                )}



              </tbody>
            </table>
          </>}

          <div className='text-center mt-5'>
            <button onClick={handleClearCart} type="button" className=" w-1/4 text-[#22DB14] border border-[#22DB14] cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5  me-2 mb-2 ">Clear Your Cart</button>
          </div>


        </div>
      </div>
    </div>


  </>
}
