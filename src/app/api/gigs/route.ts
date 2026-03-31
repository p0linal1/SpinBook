import { NextResponse } from "next/server";
import { featuredGigs } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ data: featuredGigs });
}
