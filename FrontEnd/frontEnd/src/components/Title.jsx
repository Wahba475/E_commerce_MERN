import React from 'react'

export default function Title({text1,text2}) {
  return (
    <div className='inline-flex items-center gap-2 mb-3'>
        <p className='text-2xl text-gray-500'>{text1}</p> <span className='text-2xl  font-medium text-gray-700'>{text2}</span>
        <p className='w-8 sm:w-12 h-[1px] sm:h[-2px]  bg-gray-700'></p>
      
    </div>
  )
}
