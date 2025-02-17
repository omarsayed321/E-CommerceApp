import { useFormik } from 'formik';
import React, {useContext, useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './../../context/AuthContext';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function Login() {

  const {token,setToken} = useContext(AuthContext)

  let [msg,setMsg] = useState(null);
  let [loading,setLoading] = useState(false);
  let navigate = useNavigate();


  // validation
  const validationSchema = yup.object().shape({
    email: yup.string().required("Email is required").email('Enter a valid email'),
    password: yup.string().required("Password is required").matches(/^[A-Za-z][A-Za-z0-9]{5,8}$/, 'must be: Start with a letter (either uppercase or lowercase).& Be between 6 and 9 characters in total. & Can only contain letters (A-Z or a-z) and numbers (0-9)')
  });

  // formik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setMsg(null);
      setLoading(true);
      try {
        const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
        setMsg(res.data.message);
        setToken(res.data.token);
        localStorage.setItem('token',res.data.token);
        // const userId = jwtDecode(res.data.token);
        setTimeout(() => {
          navigate('/')
        }, 1000);
      } catch (error) {
        console.error('Error:', error);
        setMsg(error.response.data.message);
      }finally{
        setLoading(false);
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mt-35 max-w-2xl m-11 mx-auto">
      <h2 className='text-3xl font-bold py-3'>Login now:</h2>


      {/* Email Field */}
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
        <input
          name="email"
          id="email"
          type="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
          className="register-style"
        />
        {formik.errors.email && formik.touched.email && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100">
            {formik.errors.email}
          </div>
        )}
      </div>

      {/* Password Field */}
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
        <input
          name="password"
          id="password"
          type="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
          className="register-style"
        />
        {formik.errors.password && formik.touched.password && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100">
            {formik.errors.password}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="register-submit-style"
      >
        {loading ? 'Loading...' : 'Login now'}
      </button>
      
      {/* Login msg */}
      {msg ? <div>{msg}</div> : null}

      <Link to={'/forget'} className='my-7 text-xl block hover:text-[#22DB14] ease-in-out transition-all duration-300'>Forget Your Password ?</Link>
    </form>


  );
}
