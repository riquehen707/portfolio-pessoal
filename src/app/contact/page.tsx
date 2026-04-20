import { redirect } from "next/navigation";

import { productsPage } from "@/resources";

export default function ContactPage() {
  redirect(productsPage.path);
}
