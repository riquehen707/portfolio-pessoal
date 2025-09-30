"use client";

import dynamic from "next/dynamic";

const Mailchimp = dynamic(
  () => import("@/components").then((m) => m.Mailchimp),
  { ssr: false }
);

type Props = {
  marginBottom?: "s" | "m" | "l" | "xl" | string;
};

export default function MailchimpClient(props: Props) {
  return <Mailchimp {...props} />;
}
