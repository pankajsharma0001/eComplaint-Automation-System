import { connectToDatabase } from "@/app/lib/mongodb";
import Complaint from "@/models/complaint";

export async function PATCH(req, { params }) {
  const { id: _id } = params;
  const body = await req.json();
  try {
    await connectToDatabase();
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      _id,
      { status: body.status },
      { new: true }
    );

    if (!updatedComplaint) {
      return new Response(
        JSON.stringify({ error: "Complaint not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ message: "status updated", complaint: updatedComplaint }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to update status" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}