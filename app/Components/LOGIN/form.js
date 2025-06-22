"use client"
import React from 'react'
import { useForm } from "react-hook-form"
import { useEffect } from 'react';
// import '../globals.css'
import { useRouter } from 'next/navigation';



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
      {isSubmitting &&  <div suppressHydrationWarning>verifying...</div>
}
      <div className='container'>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <input type="text" {...register("username", { required: { value: true, message: "This cannot be empty" }, minLength: { value: 3, message: "Min Length is 3" }, maxLength: { value: 8, message: "Maxlength is 8" } })} />
          {errors.username && <div>{errors.username.message}</div>}

          <input type="password" {...register("password", {required:{value: true, message:"This cannot be empty"}, })} />
          <input disabled={isSubmitting} type="submit" value="Submit" />
          {errors.password && <div>{errors.password.message}</div>}

          {errors.myform && <div>{errors.myform.message}</div>}



        </form>
      </div>
    </>
  )
}

export default login