import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './../../context/CartContext';
import { WishListContext } from '../../context/WishListContext';

export default function CompCard(props) {
  const { addToCart } = useContext(CartContext);
  const { addToWishList } = useContext(WishListContext);
  const { title, _id, description, imageCover, price, ratingsAverage, category } = props.product;

  
  const safeTitle = title ? title.split(" ").slice(0, 2).join(" ") : "";

  return (
    <>
      <div className="group/card group comp-card">
        <Link to={`/details/${_id}`}>
          <div>
            <img className="p-8 rounded-t-lg" src={imageCover} alt={title || 'Product Image'} />
          </div>
          <div className="px-5 pb-5">
            <div>
              <p className="tracking-tight text-[#4fa74f]">{category?.name || 'Uncategorized'}</p>
              <h2 className='font-bold my-2 text-lg'>{safeTitle}</h2>
            </div>
            <div className="flex items-center justify-between mt-2.5 ms-auto">
              <div>
                <span>{price} EGP</span>
              </div>
              <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse">
                <svg className="w-5 h-5 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm">{ratingsAverage}</span>
              </div>
            </div>
          </div>
        </Link>
        <button
          onClick={(event) => {
            addToWishList(_id);
            const icon = event.currentTarget.querySelector("i");
            if (icon) {
              icon.classList.add("text-red-600");
            }
          }}
          className='cursor-pointer flex justify-center py-8'
        >
          <div className='ms-[15rem]'>
            <i className='fa-solid fa-heart fa-xl'></i>
          </div>
        </button>
        <button onClick={() => addToCart(_id)} className="comp-card-button group-hover/card:mt-[-4rem]">
          Add to cart
        </button>
      </div>
    </>
  );
}
