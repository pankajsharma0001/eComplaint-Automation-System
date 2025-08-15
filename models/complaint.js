import mongoose from 'mongoose';

const ComplaintSchema = new mongoose.Schema({
  name: String,
  email: String,
  complaint: String,
  status: {
    type: String, 
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.models.Complaint || mongoose.model("Complaint", ComplaintSchema);
