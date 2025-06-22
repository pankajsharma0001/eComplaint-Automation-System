"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
const about = () => {

const router = useRouter();
const handleClick = ()=>{
  router.push('/about/other')
}

  return (
    <>
    <div>This is about section</div>
    <button onClick={handleClick}>click me</button>
    </>
    )
}

export default about