import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { WishListContext } from '../../context/WishListContext';
import axios from 'axios';

export default function AllOrders() {
  const [allOrders, setAllOrders] = useState([]);
  const { userId } = useContext(WishListContext);


  useEffect(() => {
    if (userId) {
      getAllOrders(userId);
    }
  }, [userId]);

  async function getAllOrders(userId) {
    try {
      const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
      setAllOrders(res.data[res.data.length - 1]);
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => {
  //   console.log(allOrders);
  // }, [allOrders]);

  return (
    <>
      <div className="mx-auto  container">
        <div className="row ">

          <div className="mt-35 mx-7 p-10 bg-[#F8F9FA] relative overflow-x-auto shadow-md sm:rounded-lg">


            <div className="flex justify-between justify-items-center align-baseline w-full">
              <h2 className='my-3 font-semibold text-4xl text-black'>Your Orders</h2>

              <h2 className='my-3 font-semibold text-xl text-black'>Payment Method: <span className='text-[#22DB14]'>{allOrders.paymentMethodType}</span> </h2>

            </div>
            <div className="flex justify-between justify-items-center align-baseline w-full">
              <h2 className='my-3 font-semibold text-xl text-black'>Total Price: <span className='text-[#22DB14]'>{allOrders.totalOrderPrice}</span> </h2>

              <h2 className='my-3 font-semibold text-xl capitalize text-black'>total number of items: <span className='text-[#22DB14]'>{allOrders?.cartItems?.length}</span> </h2>

            </div>

            {allOrders.length == 0 ? <h2 className='text-center font-semibold text-3xl my-2'>No Orders</h2> : <>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">

                <tbody>

                  {allOrders?.cartItems.map((item) => <tr key={item.product.id} className=" border-b border-gray-200 ">
                    
                    <td >
                      <div className="w-32 my-3 me-10">

                        <img src={item.product.imageCover} className="w-32 max-h-full" alt={item.product.title} />
                      </div>
                    </td>
                    <td className=" text-lg font-semibold text-left text-gray-900 ">
                      {item.product.title}
                      <h3 className="my-3 text-green-700  font-semibold ">
                        {item.price} EGP
                      </h3>
                    </td>
                    <td className=" px-6 py-4">
                      <h2 className='my-3 font-semibold text-xl text-black'>Quantity : <span className='text-[#22DB14]'>{item.count} </span> </h2>
                    </td>
                  </tr>
                  )}

                </tbody>
              </table>
            </>}
          </div>
        </div>
      </div>
    </>
  );
}
