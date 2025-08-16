import { connectToDatabase } from "@/app/lib/mongodb";
import Complaint from "@/models/complaint";
import { transporter, mailOptions } from "@/app/lib/mailer";

export async function PATCH(req, context) {
  const { id: _id } = context.params;

  const body = await req.json();
  const { status } = body;

  try {
    await connectToDatabase();

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      _id,
      { status },
      { new: true }
    );

    if (!updatedComplaint) {
      return new Response(
        JSON.stringify({ error: "Complaint not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Prepare status message
    let statusMessage = "";
    if (status === "pending") statusMessage = "Your complaint has been submitted. Wait for the admin to review.";
    else if (status === "Inprogress") statusMessage = "Your complaint has been accepted. It may take 4-5 days to resolve.";
    else if (status === "Resolved") statusMessage = "Your Problem has been solved.";
    else if (status === "Rejected") statusMessage = "Your complaint has been rejected.";

    // Send email to user
    await transporter.sendMail({
      ...mailOptions,
      to: "rakeshshrestha269@gmail.com",
      subject: `Complaint Status Updated to ${status}`,
      html: `
        <h2>Complaint Update</h2>
        <p>Dear user, ${statusMessage}</p>
        <ul>
          <li><strong>Department:</strong> ${updatedComplaint.department}</li>
          <li><strong>Room:</strong> ${updatedComplaint.room}</li>
          <li><strong>Complaint:</strong> ${updatedComplaint.complaint}</li>
        </ul>
        <p>Thank you for your patience.</p>
      `,
    });

    return new Response(
      JSON.stringify({ message: "Status updated", complaint: updatedComplaint }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating status:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update status" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
