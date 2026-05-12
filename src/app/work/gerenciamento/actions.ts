"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  WORK_ADMIN_COOKIE_NAME,
  createWorkAdminSessionValue,
  verifyWorkAdminCredentials,
} from "@/lib/workAdminAuth";

const workManagementPath = "/work/gerenciamento";

export async function loginWorkManagement(formData: FormData) {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!verifyWorkAdminCredentials(username, password)) {
    redirect(`${workManagementPath}?auth=invalid`);
  }

  const session = createWorkAdminSessionValue();
  const cookieStore = await cookies();

  cookieStore.set({
    name: WORK_ADMIN_COOKIE_NAME,
    value: session.value,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/work",
    expires: new Date(session.expiresAt),
  });

  redirect(workManagementPath);
}

export async function logoutWorkManagement() {
  const cookieStore = await cookies();

  cookieStore.set({
    name: WORK_ADMIN_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/work",
    expires: new Date(0),
  });

  redirect(workManagementPath);
}
