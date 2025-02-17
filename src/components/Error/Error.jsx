import React from 'react'

export default function Error() {
  return <div className=' min-h-screen bg-[#F1F1F1] text-[#9f9898] flex content-center text-center justify-center text-md font-semibold'>
    <div className='w-1/2 py-30 text-center'>

    <h2 className='text-6xl mb-7 text-black'>

    404
    </h2>
    <p className='font-bold'>

    File not found
    </p>
    <p className='my-5'>

    The site configured at this address does not contain the requested file.
    </p>


    <p>

    If this is your site, make sure that the filename case matches the URL as well as any file permissions.
    For root URLs (like http://example.com/) you must provide an index.html file.
    </p>
    <p className='my-5'>

    Read the full documentation for more information about using GitHub Pages.
    </p>
    </div>
  </div>
}
