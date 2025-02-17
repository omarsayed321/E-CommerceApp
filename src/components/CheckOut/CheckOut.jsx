import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';

export default function CheckOut() {
  let [msg, setMsg] = useState(null);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const { cartId,setTotalProductsCount,getCartItems,clearCart,productDetails } = useContext(CartContext);

  const ogUrl = `${window.location.origin}/E-CommerceApp/`;
  const fixedUrl = encodeURIComponent(ogUrl);

  // validation
  const validationSchema = yup.object().shape({
    shippingAddress: yup.object().shape({
      details: yup.string().required("Details are required").min(3, "Must be at least 3 characters"),
      phone: yup.string().required("Phone number is required").matches(/^01[1250][0-9]{8}$/, 'Enter a valid phone number'),
      city: yup.string().required("City is required").min(3, "Must be at least 3 characters")
    })
  });

  // formik
  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: '',
        phone: '',
        city: ''
      }
    },
    validationSchema,
    onSubmit: async (values) => {
      setMsg(null);
      setLoading(true);
      try {
        const res = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${fixedUrl}`,
          values,
          {
            headers: {
              token: localStorage.getItem('token')
            },
          }
        );

        window.location.href = res.data.session.url;

        if(res.data.status == 'success'){
          toast.success('Success');
        }
       
      } catch (error) {
        console.error('Error:', error);
        if(error.response.data.statusMsg == 'fail'){
          toast.error(error.response.data.message);
        }
        
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-2xl m-11 mx-auto">
      <h2 className='text-3xl font-bold py-3'>Payment Details:</h2>

      {/* Details Field */}
      <div className="mb-5">
        <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900">Details</label>
        <input
          name="shippingAddress.details"
          id="details"
          type="text"
          onBlur={formik.handleBlur}
          onChange={(e) => formik.setFieldValue('shippingAddress.details', e.target.value)}
          value={formik.values.shippingAddress.details}
          className="register-style"
        />
        {formik.errors.shippingAddress?.details && formik.touched.shippingAddress?.details && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100">
            {formik.errors.shippingAddress.details}
          </div>
        )}
      </div>

      {/* Phone Field */}
      <div className="mb-5">
        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone</label>
        <input
          name="shippingAddress.phone"
          id="phone"
          type="tel"
          onBlur={formik.handleBlur}
          onChange={(e) => formik.setFieldValue('shippingAddress.phone', e.target.value)}
          value={formik.values.shippingAddress.phone}
          className="register-style"
        />
        {formik.errors.shippingAddress?.phone && formik.touched.shippingAddress?.phone && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100">
            {formik.errors.shippingAddress.phone}
          </div>
        )}
      </div>

      {/* City Field */}
      <div className="mb-5">
        <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">City</label>
        <input
          name="shippingAddress.city"
          id="city"
          type="text"
          onBlur={formik.handleBlur}
          onChange={(e) => formik.setFieldValue('shippingAddress.city', e.target.value)}
          value={formik.values.shippingAddress.city}
          className="register-style"
        />
        {formik.errors.shippingAddress?.city && formik.touched.shippingAddress?.city && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100">
            {formik.errors.shippingAddress.city}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="register-submit-style"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Pay Now'}
      </button>


    </form>
  );
}
