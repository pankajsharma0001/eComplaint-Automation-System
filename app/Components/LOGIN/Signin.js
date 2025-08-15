"use client"
import React from 'react'
import { signIn , signOut, useSession } from 'next-auth/react'


const Signin = () => {
  const {data : session, status} = useSession();


  if(!session) {
  return (
  <>
      {/* {status == 'loading' && <div>Loading...</div>} */}
    <div>
    
      <button onClick={() => signIn('google', {prompt: 'select_account'})} className='bg-slate-900 text-white px-6 py-2 rounded-md mx-5'>Sign In With Google</button>
    </div>
    </>
  )
}


return null
}

export default Signin