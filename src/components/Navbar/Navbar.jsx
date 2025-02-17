import React, { useContext, useEffect } from 'react'
import Logo from '../../assets/images/freshcart-logo.svg'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

export default function Navbar(props) {

  const { cartId, productDetails, cartItems, getCartItems } = useContext(CartContext);


  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      getCartItems();
    }
  }, [])

  const navigate = useNavigate();
  let { token, setToken } = useContext(AuthContext);
  function logOut() {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  }

  return <>
    <nav className="bg-[#F8F9FA] mb-5 z-7 border-gray-200 p-4 fixed top-0 end-0 start-0  w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={Logo} className="h-8" alt="fresh cart Logo" />
        </Link>
        <button data-collapse-toggle="navbar-default" type="button" className="nav-button" aria-controls="navbar-default" aria-expanded="false">
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className="hidden mx-auto w-full md:block md:w-auto" id="navbar-default">

          {token ? <ul className="ul-style">
            <li>
              <Link to="/" className="nav-links">Home</Link>
            </li>
            <li>
              <Link to="cart" className="nav-links">cart</Link>
            </li>
            <li>
              <Link to="whishlist" className="nav-links">whish list</Link>
            </li>
            <li>
              <Link to="products" className="nav-links">products</Link>
            </li>
            <li>
              <Link to="categories" className="nav-links">categories</Link>
            </li>
            <li>
              <Link to="brands" className="nav-links">brands</Link>
            </li>
          </ul> : null}


        </div>


        <div className='space-x-3 '>

          {token ? <>
            <Link to={'/cart'}>

              <div className='relative inline-block mr-5 w-[1rem]'>

                <i className=' relative fa-solid fa-xl fa-cart-shopping fs-3  right-nav-links '>  {cartItems == null ? null : <span className='text-white text-xs absolute -top-6 -right-2 px-1.5 py-0.5 rounded-sm bg-[#4fa74f] inline-block' >{cartItems}</span>}

                </i>

              </div>
            </Link>
            <button onClick={logOut} className=' right-nav-links ' >Log out</button> </> : <>


            <Link className=" right-nav-links " to="login">Login</Link>
            <Link className=" right-nav-links " to="register">Register</Link></>
          }

        </div>
      </div>
    </nav>



  </>
}
