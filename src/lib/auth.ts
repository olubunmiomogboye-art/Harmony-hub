import crypto from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const ADMIN_COOKIE_NAME = "harmony_admin_session";

// Fallback configuration if not provided in .env.local
const DEFAULT_ADMIN_EMAIL = "admin@harmonyhub.ng";
const DEFAULT_ADMIN_PASS = "HarmonyAdmin2026!";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "harmony-hub-secret-key-ibadan-2026";

export function getAdminCredentials() {
  return {
    email: process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASS,
  };
}

/**
 * Generate HMAC token for a given email and expiry timestamp
 */
export function generateSessionToken(email: string): string {
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 7; // 7 days
  const data = `${email}:${expiresAt}`;
  const hmac = crypto.createHmac("sha256", SESSION_SECRET).update(data).digest("hex");
  return Buffer.from(`${data}:${hmac}`).toString("base64");
}

/**
 * Validate a session token
 */
export function validateSessionToken(token: string): { valid: boolean; email?: string } {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [email, expiresAtStr, hmac] = decoded.split(":");
    if (!email || !expiresAtStr || !hmac) {
      return { valid: false };
    }

    const expiresAt = parseInt(expiresAtStr, 10);
    if (isNaN(expiresAt) || Date.now() > expiresAt) {
      return { valid: false }; // expired
    }

    const expectedData = `${email}:${expiresAtStr}`;
    const expectedHmac = crypto.createHmac("sha256", SESSION_SECRET).update(expectedData).digest("hex");

    if (crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(expectedHmac))) {
      return { valid: true, email };
    }
    return { valid: false };
  } catch {
    return { valid: false };
  }
}

/**
 * Check if the current incoming request has a valid admin session cookie
 */
export async function isAuthenticatedAdmin(request?: NextRequest): Promise<boolean> {
  let token: string | undefined;

  if (request) {
    token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  } else {
    try {
      const cookieStore = await cookies();
      token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    } catch {
      return false;
    }
  }

  if (!token) return false;
  const result = validateSessionToken(token);
  return result.valid;
}
