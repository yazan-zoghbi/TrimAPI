import mongoose, { Schema } from "mongoose";

const urlSchema = new Schema({
  submitted_url: { type: String, required: true },
  final_destination: { type: String, required: true },
  hash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  clicks: { type: Number, default: 0 },
});

const URLModel = mongoose.model("URL", urlSchema);

export default URLModel;
