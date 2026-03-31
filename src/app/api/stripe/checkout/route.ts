import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    clientSecret: "seti_mock_secret",
    message: "Replace with a live checkout session or payment intent.",
  });
}
