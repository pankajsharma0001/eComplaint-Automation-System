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

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/complaints/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setComplaints((prev) =>
          prev.map((c) =>
            c._id === id ? { ...c, status: newStatus } : c
          )

        );
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      alert("Error upadting the status");
    }
  }

  const statuses = [...new Set((complaints.map((complaint) => complaint.status)))];




  return (



    <div>
      <h1>Admin Dashboard</h1>
    

      {statuses.map((status) => {
        const filteredComplaints = complaints.filter(
          (c) => c.status === status
        );


        return (
          <div key={status}>
            <h2>{status} Complaints</h2>

            {filteredComplaints.length === 0 ? (
              <p>No complaints in this category</p>
            ) : (
              filteredComplaints.map((complaint) => (
                
                    <div
                  key={complaint._id}
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

                  {complaint.status === "pending" && (
                    <>
                      <button onClick={() => updateStatus(complaint._id, "Inprogress")}>Accept</button>
                      <button onClick={() => updateStatus(complaint._id, "Rejected")}>Reject</button>
                    </>
                  )}

                  {complaint.status === "Inprogress" && (
                    <>
                      <button onClick={() => updateStatus(complaint._id, "Rejected")}>Reject</button>
                      <button onClick={() => updateStatus(complaint._id, "Resolved")}>Resolve</button>
                    </>
                  )}

                  {complaint.status === "Resolved" && <p style={{ color: "green" }}>Problem solved</p>}

                  
                  {complaint.status === "Rejected" && <p style={{ color: "red" }}>This complaint is rejected.</p>}

                </div>
              ))
            )}
          </div>
        );
      })}



    </div>
  );
}
