import mongoose from "mongoose";

const LoginSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed password
});

export default mongoose.models.Login || mongoose.model("Login", LoginSchema,'login');
