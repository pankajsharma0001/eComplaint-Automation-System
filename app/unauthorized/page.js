"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter();
  return (
    <div>
        Acess Denied!!!!
        Only Pulchowk Campus Can login in into this page. 
        <button className='flex mx-[270px] my-6 px-5 py-2 rounded-full bg-slate-900 text-white' onClick={()=> {return router.push('/')}}>Back</button>
    </div>
  )
}

export default page