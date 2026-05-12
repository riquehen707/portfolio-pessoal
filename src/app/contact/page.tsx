import { redirect } from "next/navigation";

import { servicesPage } from "@/resources";

export default function ContactPage() {
  redirect(servicesPage.path);
}
