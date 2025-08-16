"use client";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ComplaintForm() {
  const [formData, setFormData] = useState({ department: "", room: "", complaint: "", status: "pending" });
  const [complaints, setComplaints] = useState([]);
  const [activeTab, setActiveTab] = useState("submit");

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/complaints");
      const data = await res.json();
      setComplaints(data.reverse());
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/complaints", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      alert("Complaint submitted!");
      setFormData({ department: "", room: "", complaint: "", status: "pending" });
      setComplaints((prev) => [formData, ...prev]);
    }
  };



  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-300 text-gray-900";
      case "Inprogress":
        return "bg-teal-300 text-gray-900";
      case "Resolved":
        return "bg-green-300 text-gray-900";
      case "Rejected":
        return "bg-red-300 text-gray-900";
      default:
        return "bg-gray-300 text-gray-900";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">Complaint Portal</h1>
        {session?.user?.name && (
          <p className="text-center mb-6 text-gray-700 text-lg">Welcome, {session.user.name}</p>
        )}

        {/* Tabs */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            className={`px-6 py-2 rounded-xl font-semibold transition ${activeTab === "submit" ? "bg-teal-400 shadow-md text-gray-900" : "bg-gray-200 hover:bg-gray-300 text-gray-900"}`}
            onClick={() => setActiveTab("submit")}
          >
            Submit Complaint
          </button>
          <button
            className={`px-6 py-2 rounded-xl font-semibold transition ${activeTab === "view" ? "bg-teal-400 shadow-md text-gray-900" : "bg-gray-200 hover:bg-gray-300 text-gray-900"}`}
            onClick={() => setActiveTab("view")}
          >
            View Complaints
          </button>
        </div>

        {/* Submit Complaint Form */}
        {activeTab === "submit" && (
          <div className="bg-gray-50 p-8 rounded-2xl shadow-md mb-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                placeholder="Department"
                className="px-4 py-3  rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 text-gray-900"
              />
              <input
                value={formData.room}
                onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                placeholder="Room"
                className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 text-gray-900"
              />
              <textarea
                value={formData.complaint}
                onChange={(e) => setFormData({ ...formData, complaint: e.target.value })}
                placeholder="Your complaint..."
                className=" px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 text-gray-900 resize-none h-32"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-teal-400 to-violet-400 hover:from-violet-400 hover:to-teal-400 py-3 rounded-xl shadow-md transition duration-300 font-semibold text-gray-900"
              >
                Submit
              </button>
            </form>
            <button
              onClick={handleSignOut}
              className="mt-4 w-full bg-red-400 hover:bg-red-500 text-gray-900 py-3 rounded-xl shadow-md transition duration-300 font-semibold"
            >
              Sign Out
            </button>
          </div>
        )}

        {/* View Complaints */}
        {activeTab === "view" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {complaints.length === 0 && (
              <p className="text-center text-gray-500 italic col-span-2">No complaints submitted yet.</p>
            )}
            {complaints.map((complaint, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow hover:scale-105 transform transition duration-300"
              >
                <p className="mb-2"><strong>Department:</strong> {complaint.department}</p>
                <p className="mb-2"><strong>Room No:</strong> {complaint.room}</p>
                <p className="mb-2"><strong>Complaint:</strong> {complaint.complaint}</p>
                <span className={`inline-block px-3 py-1 mt-3 rounded-full font-semibold ${getStatusColor(complaint.status)}`}>
                  {complaint.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
