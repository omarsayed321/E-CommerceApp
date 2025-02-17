import React from 'react'
import { Bars } from 'react-loader-spinner'

export default function Loader() {
  return <div className='z-2 absolute top-0 end-0 start-0 loader'>
    <Bars
      height="100"
      width="80"
      
      color="#4fa94d"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  </div>
}
