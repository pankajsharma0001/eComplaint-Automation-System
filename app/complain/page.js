"use client";
import { useState } from "react";

export default function ComplaintForm() {
  const [formData, setFormData] = useState({ name: "", email: "", complaint: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/complaints", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      alert("Complaint submitted!");
      setFormData({ name: "", email: "", complaint: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Name" />
      <input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="Email" />
      <textarea value={formData.complaint} onChange={e => setFormData({ ...formData, complaint: e.target.value })} placeholder="Complaint" />
      <button type="submit">Submit</button>
    </form>
  );
}
