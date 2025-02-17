import { useFormik } from 'formik';
import React, { useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

export default function Register() {

  let [msg, setMsg] = useState(null);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();


  // validation
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required").min(3, 'Min 3 characters').max(20, 'Max 20 characters'),
    email: yup.string().required("Email is required").email('Enter a valid email'),
    password: yup.string().required("Password is required").matches(/^[A-Za-z][A-Za-z0-9]{5,8}$/, 'must be: Start with a letter (either uppercase or lowercase).& Be between 6 and 9 characters in total. & Can only contain letters (A-Z or a-z) and numbers (0-9)'),
    rePassword: yup.string().required("Confirm password is required").oneOf([yup.ref('password')], 'Passwords do not match'),
    phone: yup.string().required("Phone number is required").matches(/^01[1250][0-9]{8}$/, 'Enter a valid phone number')
  });

  // formik
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setMsg(null);
      setLoading(true);
      try {
        const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
        setMsg(res.data.message);

        setTimeout(() => {
          navigate('/login')
        }, 1000);
      } catch (error) {
        console.error('Error:', error);
        setMsg(error.response.data.message);
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mt-35 max-w-2xl m-11 mx-auto">
      <h2 className='text-3xl font-bold py-3'>Register now:</h2>

      {/* Name Field */}
      <div className="mb-5">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
        <input
          name="name"
          id="name"
          type="text"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.name}
          className="register-style"
        />
        {formik.errors.name && formik.touched.name && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100">
            {formik.errors.name}
          </div>
        )}
      </div>

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

      {/* Confirm Password Field */}
      <div className="mb-5">
        <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
        <input
          name="rePassword"
          id="rePassword"
          type="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.rePassword}
          className="register-style"
        />
        {formik.errors.rePassword && formik.touched.rePassword && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100">
            {formik.errors.rePassword}
          </div>
        )}
      </div>

      {/* Phone Field */}
      <div className="mb-5">
        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone</label>
        <input
          name="phone"
          id="phone"
          type="tel"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.phone}
          className="register-style"
        />
        {formik.errors.phone && formik.touched.phone && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100">
            {formik.errors.phone}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="register-submit-style"
      >
        {loading ? 'Loading...' : 'Register now'}
      </button>

      {/* register msg & loading */}
      {msg ? <div>{msg}</div> : null}



    </form>
  );
}
