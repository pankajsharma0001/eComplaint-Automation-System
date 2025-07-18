import { connectToDatabase } from "@/app/lib/mongodb";
import Complaint from "@/models/complaint";

export async function POST(req) {
  try {
    const body = await req.json();
    await connectToDatabase();
    const complaint = await Complaint.create(body);
    return Response.json({ message: "Complaint submitted", id: complaint._id });
  } catch (error) {
    return Response.json({ error: "Failed to submit complaint" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    return Response.json(complaints);
  } catch (error) {
    return Response.json({ error: "Failed to fetch complaints" }, { status: 500 });
  }
}
