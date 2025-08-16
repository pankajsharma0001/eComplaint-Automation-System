"use client";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ComplaintForm() {
  const [formData, setFormData] = useState({ department: "", room: "", complaint: "", status: "pending" });
  const [complaints, setComplaints] = useState([]);
  const [viewComplaint, setViewComplaint] = useState(false);

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
        return "bg-yellow-500 text-black";
      case "Inprogress":
        return "bg-blue-500 text-white";
      case "Resolved":
        return "bg-green-600 text-white";
      case "Rejected":
        return "bg-red-600 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white flex flex-col items-center p-6">
      <div className="w-full max-w-3xl">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-8">Complaint Portal</h1>

        {/* Form Section */}
        <div className="bg-gray-900/60 p-8 rounded-2xl shadow-lg border border-gray-700 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Submit a Complaint</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              placeholder="Department"
              className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              value={formData.room}
              onChange={(e) => setFormData({ ...formData, room: e.target.value })}
              placeholder="Room"
              className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <textarea
              value={formData.complaint}
              onChange={(e) => setFormData({ ...formData, complaint: e.target.value })}
              placeholder="Your complaint..."
              className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-32"
            />

            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl shadow-md transition duration-300 font-semibold"
            >
              Submit
            </button>
          </form>

          <button
            onClick={handleSignOut}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl shadow-md transition duration-300 font-semibold"
          >
            Sign Out
          </button>

          {session?.user?.name && (
            <p className="text-center mt-4 text-gray-300">Welcome, {session.user.name}</p>
          )}
        </div>

        {/* Complaints Section */}
        {viewComplaint && (
          <div className="bg-gray-900/60 p-6 rounded-2xl shadow-lg border border-gray-700 mb-8">
            <h2 className="text-2xl font-semibold text-center mb-4">Your Complaints</h2>
            {complaints.length === 0 && (
              <p className="text-center text-gray-400 italic">No complaints submitted yet.</p>
            )}
            <div className="flex flex-col gap-4">
              {complaints.map((complaint, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 shadow-md"
                >
                  <p><strong>Department:</strong> {complaint.department}</p>
                  <p><strong>Room No:</strong> {complaint.room}</p>
                  <p><strong>Complaint:</strong> {complaint.complaint}</p>
                  <p className={`inline-block px-2 py-1 mt-2 rounded ${getStatusColor(complaint.status)}`}>
                    {complaint.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Toggle Button at Bottom */}
        <div className="flex justify-center">
          <button
            onClick={() => setViewComplaint(!viewComplaint)}
            className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl shadow-md transition duration-300 font-semibold"
          >
            {viewComplaint ? "Hide Complaints" : "View Complaints"}
          </button>
        </div>
      </div>
    </div>
  );
}
