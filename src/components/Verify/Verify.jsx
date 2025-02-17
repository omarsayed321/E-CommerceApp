import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './../../context/AuthContext';
import { Link } from 'react-router-dom';


export default function Verify() {

  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let [msg, setMsg] = useState(null);

  // validation
  const validationSchema = yup.object().shape({
    resetCode: yup.string().required("code is required").matches(/^\d{6}$/, 'code must be 6 digits only')
  });

  // formik
  const formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values);
        setMsg(res.data.status);
        setTimeout(() => {
          navigate('/resetPassword')
        }, 1000);
      } catch (error) {
        setMsg(error.response.data.message);
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
  });
  return <>
    <form onSubmit={formik.handleSubmit} className="mt-30 max-w-2xl m-11 mx-auto">
      <h2 className='text-3xl font-semibold py-3 capitalize'>please enter your verification code:</h2>

      {/* code Field */}
      <div className="mb-5">
        <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900"></label>
        <input
          name="resetCode"
          id="resetCode"
          type="text"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.resetCode}
          className="register-style"
        />
        {formik.errors.resetCode && formik.touched.resetCode && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100">
            {formik.errors.resetCode}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="register-submit-style"
      >
        {loading ? 'verifing...' : 'verify'}
      </button>

      {/* code msg */}
      {msg ? <div>{msg}</div> : null}


    </form>

  </>
}
