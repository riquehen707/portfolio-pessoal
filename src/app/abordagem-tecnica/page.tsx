import { permanentRedirect } from "next/navigation";

import { technicalApproach } from "@/resources";

export default function LegacyTechnicalApproachPage() {
  permanentRedirect(technicalApproach.path);
}
