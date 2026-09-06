import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceLandingPage } from "@/components/services/landing/ServiceLandingPage";
import { exampleServiceLanding } from "@/content/service-landings/example";

export const metadata: Metadata = {
  title: "Prévia do padrão de serviços",
  description: "Demonstração fictícia disponível somente em desenvolvimento.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/dev/service-landing" },
};

export default function ServiceLandingPreview() {
  if (process.env.NODE_ENV !== "development") notFound();
  return (
    <ServiceLandingPage
      landing={exampleServiceLanding}
      form={
        <p>
          Exemplo sem coleta de dados. O formulário real precisa de integração de envio, confirmação
          do servidor e condições de privacidade antes da publicação.
        </p>
      }
    />
  );
}
