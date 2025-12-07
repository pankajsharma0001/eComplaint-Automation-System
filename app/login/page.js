"use client";

import { Suspense } from "react";
import Login from "../Components/LOGIN/form"; // your code

export default function LoginPage() {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
}
