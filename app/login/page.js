"use client"
import Form from '../Components/LOGIN/form'
import { useEffect, useState } from 'react'

export default function LoginPage() {
  const [showError, setShowError] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setShowError(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [])
  return (
    <div>
      {showError && <h1 className='text-center text-red-500'>PleaseLogin first</h1>}
      <Form />
    </div>
  )
}
