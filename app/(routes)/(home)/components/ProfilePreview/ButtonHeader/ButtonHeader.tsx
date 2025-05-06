import { Megaphone, Share } from 'lucide-react'
import React from 'react'

export function ButtonHeader() {
  return (
    <div  className='flex justify-end gap-6 '>
      <div className='border rounded-full p-2 shadow-md hover:bg-slate-100 cursor-pointer'>
        <Megaphone strokeWidth={1} />
      </div>
      <div className='flex gap-1 items-center border rounded-full p-2 shadow-md hover:bg-slate-100 cursor-pointer font-semibold'>
         <Share strokeWidth={1} className='w-4 h-4'/>
         <span>share</span>
      </div>
    </div>
  )
}
