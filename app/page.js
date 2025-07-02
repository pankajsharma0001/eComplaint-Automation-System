"use client"
import Form from "./Components/LOGIN/form";
import { useRouter } from 'next/navigation';
// import Signin from "./Components/LOGIN/Signin";


export default function Home() {

  const router = useRouter();

 const handleClick =()=>{
  router.push('/about')
 };
   
  return (
    <>
 <Form/>
 {/* <Signin/> */}
 {/* <button className=" m-auto flex py-1.5 px-4 rounded-lg bg-slate-900 text-white" onClick={handleClick}>ABout Section </button> */}
  </>);
}
