import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Products from './components/Products/Products';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Error from './components/Error/Error';
import WishList from './components/WishList/WishList';
import AuthContextProvider, { AuthContext } from './context/AuthContext'
import Gaurd from './components/Gaurd/Gaurd'
import AuthGaurd from './components/AuthGaurd/AuthGaurd'
import { QueryClient, QueryClientProvider } from 'react-query'
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './context/CartContext'
import { Toaster } from 'react-hot-toast'
import WishListContextProvider from './context/WishListContext'
import Forget from './components/Forget/Forget'
import Verify from './components/verify/Verify'
import Reset from './components/Reset/Reset'
import CheckOut from './components/CheckOut/CheckOut'
import AllOrders from './components/AllOrders/AllOrders'


const queryClient = new QueryClient();
const routes = createHashRouter([
  {
    path: '', element: <Layout/>, children: [
      { index: true, element: <Gaurd><Home/></Gaurd> },
      { path: 'cart', element: <Gaurd><Cart/></Gaurd> },
      { path: 'whishlist', element: <Gaurd><WishList/></Gaurd> },
      { path: 'products', element: <Gaurd><Products/></Gaurd> },
      { path: 'categories', element: <Gaurd><Categories/></Gaurd> },
      { path: 'brands', element: <Gaurd><Brands/></Gaurd> },
      { path: 'details/:id', element: <Gaurd><ProductDetails/></Gaurd> },
      { path: 'checkOut', element: <Gaurd><CheckOut/></Gaurd> },
      { path: 'allorders', element: <Gaurd><AllOrders/></Gaurd> },
      { path: 'register', element: <AuthGaurd><Register/></AuthGaurd> },
      { path: 'login', element: <AuthGaurd><Login/></AuthGaurd> },
      { path: 'forget', element: <AuthGaurd><Forget/></AuthGaurd> },
      { path: 'verify', element: <AuthGaurd><Verify/></AuthGaurd> },
      { path: 'resetPassword', element: <AuthGaurd><Reset/></AuthGaurd> },
    ]
  },
  { path: '*', element: <Error/> }
])

function App() {
  return (
    <>
      <AuthContextProvider>
        <WishListContextProvider>
          <CartContextProvider>
            <QueryClientProvider client={queryClient}>
              <Toaster position="top-right" reverseOrder={false} />
              <RouterProvider router={routes} />
            </QueryClientProvider>
          </CartContextProvider>
        </WishListContextProvider>
      </AuthContextProvider>

    </>
  )
}

export default App
