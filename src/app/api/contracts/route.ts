import { NextResponse } from "next/server";
import { bookings } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({
    data: bookings.map((booking) => ({
      bookingId: booking.id,
      contractId: booking.contractId,
      status: booking.status,
    })),
  });
}
