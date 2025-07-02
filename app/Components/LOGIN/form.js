"use client"
import React from 'react'
import { useForm } from "react-hook-form"
import { useEffect } from 'react';
// import '../globals.css'
import { useRouter } from 'next/navigation';
import Signin from './Signin';




const login = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();


  const router = useRouter();

  const username = watch("username");
  const password = watch("password");


  useEffect(() => {
    clearErrors("myform");
  }, [username, password, clearErrors]);



  const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, d * 1000);


    })
  }

  const onSubmit = async (data) => {

    await delay(2);

    try {
      // Call your login API endpoint
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      const response = await res.json();

      if (!res.ok) {
        // API returned an error — show it on form
        setError("myform", { message: response.error || "Login failed" });
      } else {
        reset();  // clear form on success
        router.push('/admin')
        alert("Login successful! Welcome " + data.username);
      }
    } catch (error) {
      setError("myform", { message: "Something went wrong, please try again." });
    }

    // if (data.username.trim() !== "admin") {

    //   setError("myform", { message: "The username is incorrect" });
    //   return;
    // }
    // else if (data.password != "admin") {
    //   setError("myform", { message: "The password is incorrect" });

    //   return;
    // }
    // else {
    //   console.log(data);
    //   reset();
    // }


  };

  return (
    <>
      <div className="flex">
        <div className='container mx-auto flex flex-col  items-center   my-10 bg-gray-400 rounded-xl md:max-w-[450px] py-[40px]'>

          <h1>LOGIN</h1>
          <form action="" className='flex  flex-col gap-2.5' onSubmit={handleSubmit(onSubmit)}>

            <label>Username:</label>
            <input type="text" {...register("username", { required: { value: true, message: "This cannot be empty" }, minLength: { value: 3, message: "Min Length is 3" }, maxLength: { value: 8, message: "Maxlength is 8" } })} />
            {errors.username && <div className='text-red-600'>{errors.username.message}</div>}

            <label>Password:</label>
            <input type="password" {...register("password", { required: { value: true, message: "This cannot be empty" }, })} />
            {errors.password && <div className='text-red-600'>{errors.password.message}</div>}

            {isSubmitting && <div suppressHydrationWarning>verifying...</div>}
            {errors.myform && <div className='text-red-600'>{errors.myform.message}</div>}

            <input className='bg-slate-900 my-5  text-white px-16 py-2 rounded-md mx-5' disabled={isSubmitting} type="submit" value="Login" />
          </form>
          <Signin />
        </div>

      </div>





    </>
  )
}

export default login