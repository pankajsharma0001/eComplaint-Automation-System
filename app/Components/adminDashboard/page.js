"use client";
import { useEffect, useState } from "react";
import { CheckCircleIcon, XCircleIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");

  const router = useRouter();

  // Fetch complaints on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/complaints");
        const data = await res.json();
        setComplaints(data.reverse()); // newest first
      } catch (err) {
        console.error("Failed to fetch complaints:", err);
      }
    };
    fetchData();
  }, []);

  // Update status of a complaint
  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/complaints/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setComplaints((prev) =>
          prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
        );
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      alert("Error updating status");
    }
  };

  // Sign out handler
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const statuses = ["all", ...new Set(complaints.map((c) => c.status))];
  const filteredComplaints =
    selectedStatus === "all"
      ? complaints
      : complaints.filter((c) => c.status === selectedStatus);

  const statusColors = {
    pending: "bg-yellow-500",
    Inprogress: "bg-blue-500",
    Resolved: "bg-green-600",
    Rejected: "bg-red-600",
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6">📋 Complaints</h2>
          <ul className="space-y-2">
            {statuses.map((status) => (
              <li key={status}>
                <button
                  onClick={() => setSelectedStatus(status)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    selectedStatus === status
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-2xl shadow-md transition duration-300"
        >
          Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {selectedStatus === "all"
            ? "All Complaints"
            : `${selectedStatus} Complaints`}
        </h1>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 border-b text-left">Department</th>
                <th className="py-3 px-4 border-b text-left">Room no</th>
                <th className="py-3 px-4 border-b text-left">Complaint</th>
                <th className="py-3 px-4 border-b text-left">Status</th>
                <th className="py-3 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500 italic">
                    No complaints found
                  </td>
                </tr>
              ) : (
                filteredComplaints.map((c) => (
                  <tr key={c._id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">{c.department}</td>
                    <td className="py-3 px-4 border-b">{c.room}</td>
                    <td className="py-3 px-4 border-b">{c.complaint}</td>
                    <td className="py-3 px-4 border-b">
                      <span
                        className={`px-2 py-1 text-white rounded ${statusColors[c.status]}`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b space-x-2">
                      {c.status === "pending" && (
                        <>
                          <button
                            onClick={() => updateStatus(c._id, "Inprogress")}
                            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            title="Accept"
                          >
                            <ArrowPathIcon className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => updateStatus(c._id, "Rejected")}
                            className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                            title="Reject"
                          >
                            <XCircleIcon className="w-5 h-5" />
                          </button>
                        </>
                      )}
                      {c.status === "Inprogress" && (
                        <>
                          <button
                            onClick={() => updateStatus(c._id, "Resolved")}
                            className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                            title="Resolve"
                          >
                            <CheckCircleIcon className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => updateStatus(c._id, "Rejected")}
                            className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                            title="Reject"
                          >
                            <XCircleIcon className="w-5 h-5" />
                          </button>
                        </>
                      )}
                      {c.status === "Resolved" && (
                        <span className="text-green-600 font-semibold">✅ Solved</span>
                      )}
                      {c.status === "Rejected" && (
                        <span className="text-red-600 font-semibold">❌ Rejected</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
