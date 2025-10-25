// models/Booking.js
import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  slotKey: { type: String, unique: true }, // e.g. 20251030T0900Z_host1
  name: String,
  email: String,
  company: String,
  website: String,
  phone: String,
  message: String,
  start: { type: Date, required: true }, // stored in UTC
  end: { type: Date, required: true },   // stored in UTC
  timezone: String,
  createdAt: { type: Date, default: Date.now },
});

BookingSchema.index({ start: 1, end: 1 });

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
