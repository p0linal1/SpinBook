import type { NextRequest } from "next/server";

export async function getAuthContext(_request: NextRequest) {
  return {
    user: null,
    role: null,
    authenticated: false,
  };
}
