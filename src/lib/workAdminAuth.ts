import { createHmac, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";

const WORK_ADMIN_COOKIE_NAME = "work-admin-session";
const WORK_ADMIN_USERNAME = "admin";
const WORK_ADMIN_PASSWORD = "admin";
const WORK_ADMIN_SESSION_SECRET = "work-management-preview-secret";
const WORK_ADMIN_SESSION_MAX_AGE = 60 * 60 * 12;

type WorkAdminSession = {
  username: string;
  expiresAt: number;
};

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function createSignature(expiresAt: number) {
  return createHmac("sha256", WORK_ADMIN_SESSION_SECRET)
    .update(String(expiresAt))
    .digest("base64url");
}

export function verifyWorkAdminCredentials(username: string, password: string) {
  return (
    safeEqual(username.trim(), WORK_ADMIN_USERNAME) &&
    safeEqual(password.trim(), WORK_ADMIN_PASSWORD)
  );
}

export function createWorkAdminSessionValue() {
  const expiresAt = Date.now() + WORK_ADMIN_SESSION_MAX_AGE * 1_000;
  const signature = createSignature(expiresAt);

  return {
    value: `${expiresAt}.${signature}`,
    expiresAt,
  };
}

export function readWorkAdminSession(sessionValue?: string | null): WorkAdminSession | null {
  if (!sessionValue) {
    return null;
  }

  const [expiresAtRaw, signature] = sessionValue.split(".");
  const expiresAt = Number(expiresAtRaw);

  if (!expiresAtRaw || !signature || !Number.isFinite(expiresAt)) {
    return null;
  }

  if (expiresAt <= Date.now()) {
    return null;
  }

  const expectedSignature = createSignature(expiresAt);

  if (!safeEqual(signature, expectedSignature)) {
    return null;
  }

  return {
    username: WORK_ADMIN_USERNAME,
    expiresAt,
  };
}

export async function getWorkAdminSession() {
  const cookieStore = await cookies();
  return readWorkAdminSession(cookieStore.get(WORK_ADMIN_COOKIE_NAME)?.value);
}

export { WORK_ADMIN_COOKIE_NAME, WORK_ADMIN_SESSION_MAX_AGE };
