import React from 'react'
import Error from './../Error/Error';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function Gaurd({children}) {

  const token = localStorage.getItem('token');
  // const userId = jwtDecode(token);
  // console.log(userId);
  
  return <>
    {token ? children : <Navigate to='/login' />}
  </>
}
