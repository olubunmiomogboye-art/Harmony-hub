import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  getAdminCredentials,
  generateSessionToken,
  isAuthenticatedAdmin,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const isAuth = await isAuthenticatedAdmin(request);
  return NextResponse.json({
    authenticated: isAuth,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const creds = getAdminCredentials();

    if (
      email &&
      password &&
      email.toLowerCase().trim() === creds.email.toLowerCase().trim() &&
      password === creds.password
    ) {
      const token = generateSessionToken(email.toLowerCase().trim());
      const response = NextResponse.json({
        success: true,
        message: "Authentication successful",
      });

      response.cookies.set({
        name: ADMIN_COOKIE_NAME,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: "Invalid email or password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  response.cookies.delete(ADMIN_COOKIE_NAME);
  return response;
}
