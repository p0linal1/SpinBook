import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    onboardingUrl: "https://connect.stripe.com/setup/example",
    message: "Replace with a live Stripe Connect account link flow.",
  });
}
