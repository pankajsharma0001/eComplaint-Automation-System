"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason"); // check why user landed here
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data) => {
    if (data.username === "admin") {
      router.push("/admin"); // normal admin login
    } else {
      router.push("/complain");
    }
  };

  const handleGoogleSignIn = () => signIn("google", { callbackUrl: "/complain" });

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gray-100 p-6 overflow-hidden">

      {/* Floating gradient behind form */}
      <div className="absolute -z-10 w-80 h-80 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded-full opacity-40 animate-pulse blur-3xl top-10 left-10"></div>
      <div className="absolute -z-10 w-72 h-72 bg-gradient-to-r from-yellow-300 to-yellow-100 rounded-full opacity-30 animate-pulse blur-3xl bottom-10 right-10"></div>

      <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl shadow-2xl">

        {/* Left: Form */}
        <div className={`w-full md:w-1/2 p-10 flex flex-col justify-center bg-white/20 backdrop-blur-md relative z-10 transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-3xl font-bold mb-2 text-yellow-600">Welcome Back!</h1>
          <p className="text-gray-700 mb-4">Sign in to your account and start exploring</p>

          {/* Show message only if redirected for unauthenticated access */}
          {reason === "unauthenticated" && (
            <p className="text-red-500 mb-4 font-semibold">
              Please login first
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 relative z-10">
            <input
              type="text"
              placeholder="Username"
              className="p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition bg-white/20 backdrop-blur-sm"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

            <input
              type="password"
              placeholder="Password"
              className="p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition bg-white/20 backdrop-blur-sm"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-yellow-500 text-white py-3 rounded-xl mt-2 shadow-md hover:bg-yellow-600 transition transform hover:scale-105 font-semibold"
            >
              Sign In
            </button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="mx-4 text-gray-400 font-semibold">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Google Sign-in */}
          <button
            onClick={handleGoogleSignIn}
            className="flex-1 py-2 border border-gray-300 rounded-xl flex justify-center items-center gap-3 shadow-sm hover:bg-gray-100 transition transform hover:scale-105 bg-white/90"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="#4285F4" d="M533.5 278.4c0-17.5-1.5-34.3-4.3-50.7H272v95.8h146.9c-6.3 33.9-25.3 62.8-53.9 82v68.1h87c50.9-46.9 80.5-116.1 80.5-195.2z"/>
              <path fill="#34A853" d="M272 544.3c72.6 0 133.6-24.1 178-65.3l-87-68.1c-24.1 16.2-54.8 25.7-91 25.7-69.9 0-129.3-47.2-150.5-110.4h-89.3v69.3C79.3 481.1 167.3 544.3 272 544.3z"/>
              <path fill="#FBBC05" d="M121.5 326.2c-5.4-16.2-8.5-33.4-8.5-51s3.1-34.8 8.5-51v-69.3h-89.3C16.8 199.3 0 235.1 0 272s16.8 72.7 32.2 97.6l89.3-69.4z"/>
              <path fill="#EA4335" d="M272 107.4c37.2 0 70.4 12.8 96.7 33.9l72.5-72.5C405.6 31.6 344.6 0 272 0 167.3 0 79.3 63.2 32.2 163.3l89.3 69.3C142.7 154.6 202.1 107.4 272 107.4z"/>
            </svg>
            Sign in with Google
          </button>
        </div>

        {/* Right: Image with overlay */}
        <div className={`hidden md:block w-1/2 relative transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <img
            src="/college.jpg" // Replace with your college image
            alt="College"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
