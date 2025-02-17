import { useFormik } from 'formik';
import React, {useContext, useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Reset() {

  let [msg,setMsg] = useState(null);
  let [loading,setLoading] = useState(false);
  let navigate = useNavigate();


  // validation
  const validationSchema = yup.object().shape({
    email: yup.string().required("Email is required").email('Enter a valid email'),
    newPassword: yup.string().required("newPassword is required").matches(/^[A-Za-z][A-Za-z0-9]{5,8}$/, 'must be: Start with a letter (either uppercase or lowercase).& Be between 6 and 9 characters in total. & Can only contain letters (A-Z or a-z) and numbers (0-9)')
  });

  // formik
  const formik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setMsg(null);
      setLoading(true);
      try {
        const res = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values);
        setMsg('Password Reset'); 
        setTimeout(() => {
          navigate('/login')
        }, 1500);
      } catch (error) {
        console.error('Error:', error);
        setMsg(error.response.data.message);
      }finally{
        setLoading(false);
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className=" mt-30 max-w-2xl m-11 mx-auto">
      <h2 className='text-3xl font-bold py-3 capitalize'>reset your account new Password:</h2>


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

      {/* new Password Field */}
      <div className="mb-5">
        <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900">New Password</label>
        <input
          name="newPassword"
          id="newPassword"
          type="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.newPassword}
          className="register-style"
        />
        {formik.errors.newPassword && formik.touched.newPassword && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100">
            {formik.errors.newPassword}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="register-submit-style"
      >
        {loading ? 'Loading...' : 'Reset Password'}
      </button>
      
      {/* reset msg */}
      {msg ? <div>{msg}</div> : null}

    </form>


  );
}
