import React from 'react'
import { Navigate } from 'react-router-dom'

export default function AuthGaurd({children}) {
  const token = localStorage.getItem('token');
  return <>
    {token ? <Navigate to='/' /> : children}
  </>
}
