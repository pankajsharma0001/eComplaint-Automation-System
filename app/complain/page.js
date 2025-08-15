"use client";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from "next/navigation";


export default function ComplaintForm() {
  const [formData, setFormData] = useState({ name: "", email: "", complaint: "", status: "pending" });
  const router = useRouter();
  const [complaints, setComplaints] = useState([]);
  const [viewComplaint, setViewComplaint] = useState(false)
  // const [hideComplaint, setHideComplaint] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/complaints");
      const data = await res.json();
      setComplaints(data);
    };
    fetchData();
  }, []);


  const { data: session, status } = useSession();


  const handleSubmit = async (e) => {
    e.preventDefault();



    const res = await fetch("/api/complaints", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      alert("Complaint submitted!");
      setFormData({ name: "", email: "", complaint: "", status: "pending" });
    }
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push("/")
  }


  return (<>
 
    
  {!viewComplaint && <button onClick={()=>setViewComplaint(true)}>View Complaint</button>}
      
      {complaints.length === 0 && <p>No Complaints were made</p>}
    {viewComplaint &&
      <p>your Complaints</p> && complaints.map((complaint) => (
        <div key={complaint._id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            margin: 10,
          }}
        >
          <p><strong>Name:</strong> {complaint.name}</p>
          <p><strong>Email:</strong> {complaint.email}</p>
          <p><strong>Complaint:</strong> {complaint.complaint}</p>
          <p><strong>Status:</strong> {complaint.status}</p>
        </div>
      ))}

      {viewComplaint && <button onClick={()=>setViewComplaint(false)}>Hide Complaint</button>}
{/* 
      <button onClick={()=>setViewComplaint(!viewComplaint)}>
      {viewComplaint ? "Hide Complaints" : "View Complaints"}
    </button> */}

     


    <p>welcome, {session?.user?.name}</p>

    <form onSubmit={handleSubmit}>
      <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Name" />
      <input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="Email" />
      <textarea value={formData.complaint} onChange={e => setFormData({ ...formData, complaint: e.target.value })} placeholder="Complaint" />
      <button type="submit">Submit</button>
    </form>

    <button onClick={handleSignOut}>sign out</button>
  </>
  );
}
