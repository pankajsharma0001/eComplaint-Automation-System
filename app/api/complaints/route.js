
import { connectToDatabase } from "@/app/lib/mongodb";
import Complaint from "@/models/complaint";
import { transporter, mailOptions } from "@/app/lib/mailer"; 
export async function POST(req) {
  try {
    const body = await req.json();
    const { department, room, complaint } = body; 

    await connectToDatabase();

    // For Database
    const newComplaint = await Complaint.create(body);

    // Email to user
    await transporter.sendMail({
      ...mailOptions,
      to: "rakeshshrestha269@gmail.com", 
      subject: "Complaint Submitted Successfully",
      html: `
        <h2>Complaint Submitted</h2>
        <p>Dear user,</p>
        <p>Your complaint has been submitted successfully. Here are the details:</p>
        <ul>
          <li><strong>Department:</strong> ${department}</li>
          <li><strong>Room:</strong> ${room}</li>
          <li><strong>Complaint:</strong> ${complaint}</li>
          <li><strong>Status:</strong> Pending</li>
        </ul>
        <p>We will look into it as soon as possible.</p>
      `,
    });

    // Email to admin
    await transporter.sendMail({
      ...mailOptions,
      to: "rakeshshrestha269@gmail.com", 
      subject: "New Complaint Alert!!",
      html: `
        <h2>New Complaint Alert</h2>
        <p>A new complaint has been submitted. Details below:</p>
        <ul>
          <li><strong>Department:</strong> ${department}</li>
          <li><strong>Room:</strong> ${room}</li>
          <li><strong>Complaint:</strong> ${complaint}</li>
        </ul>
      `,
    });

    return Response.json(
      { message: "Complaint submitted and emails sent", id: newComplaint._id },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error submitting complaint:", error);
    return Response.json({ error: "Failed to submit complaint" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectToDatabase();
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    return Response.json(complaints);
  } catch (error) {
    return Response.json({ error: "Failed to fetch complaints" }, { status: 500 });
  }
}


