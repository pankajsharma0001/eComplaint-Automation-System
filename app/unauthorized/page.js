"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { LockClosedIcon } from '@heroicons/react/24/outline';

const UnauthorizedPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-lg flex flex-col items-center max-w-md text-center">
        {/* Animated Lock with inline style */}
        <LockClosedIcon
          className="h-16 w-16 text-red-500 mb-4"
          style={{
            animation: "bounce 1.5s infinite",
            transformOrigin: "center",
          }}
        />

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Denied!</h1>
        <p className="text-gray-700 mb-6">
          Only Pulchowk Campus users are allowed to log in to this page.
        </p>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition duration-300"
        >
          Go Back
        </button>
      </div>

      {/* Define animation inside JSX */}
      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default UnauthorizedPage;
