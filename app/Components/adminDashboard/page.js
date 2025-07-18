"use client";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/complaints");
      const data = await res.json();
      setComplaints(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {complaints.length == 0 && <div>No complaints are made..</div>}
      {complaints.map((complaint) => (
        <div key={complaint._id} style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}>
          <p><strong>Name:</strong> {complaint.name}</p>
          <p><strong>Email:</strong> {complaint.email}</p>
          <p><strong>Complaint:</strong> {complaint.complaint}</p>
          <p><em>Submitted at:</em> {new Date(complaint.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
