import { connectDB } from "../../../../lib/mongodb";
import Booking from "../../../../models/booking";

export async function POST(req) {
  await connectDB();
  try {
    const { email } = await req.json();
    if (!email) return new Response(JSON.stringify({ error: "Email required" }), { status: 400 });

    const now = new Date();
    const result = await Booking.deleteMany({ email, end: { $lte: now } });

    return new Response(JSON.stringify({ deleted: result.deletedCount || 0 }), { status: 200 });
  } catch (err) {
    console.error("Delete expired booking error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
