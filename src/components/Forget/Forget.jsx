import { useFormik } from 'formik';
import React, {useContext, useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './../../context/AuthContext';
import { Link } from 'react-router-dom';


export default function Forget() {
  
    let [loading,setLoading] = useState(false);
    let navigate = useNavigate();
  
  // validation
  const validationSchema = yup.object().shape({
    email: yup.string().required("Email is required").email('Enter a valid email'),
  });

  // formik
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values);
        setTimeout(() => {
          navigate('/verify')
        }, 1000);
      } catch (error) {
        console.error('Error:', error);
      }finally{
        setLoading(false);
      }
    }
  });
  return <>
  <form onSubmit={formik.handleSubmit} className="mt-35 max-w-2xl m-11 mx-auto">
      <h2 className='text-3xl font-semibold py-3 capitalize'>please enter your email:</h2>


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

      {/* Submit Button */}
      <button
        type="submit"
        className="register-submit-style"
      >
        {loading ? 'Loading...' : 'send'}
      </button>
      

    </form>
  
  </>
}
