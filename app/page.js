"use client"
import Form from "./Components/LOGIN/form";
import { useRouter } from 'next/navigation';


export default function Home() {

  const router = useRouter();

 const handleClick =()=>{
  router.push('/about')
 };
   
  return (
    <>
 <Form/>
 <button onClick={handleClick}>ABout Section</button>
  </>);
}
