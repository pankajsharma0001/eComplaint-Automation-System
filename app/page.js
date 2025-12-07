"use client";
import Form from "./Components/LOGIN/form";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <Form />
    </Suspense>
  );
}
