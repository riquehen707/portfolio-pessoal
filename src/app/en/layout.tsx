import type { ReactNode } from "react";
import Script from "next/script";

// The root layout remains the Portuguese legacy shell. This changes the document
// language before paint for the additive English namespace and scopes it on the
// rendered content for assistive technology.
export default function EnglishLayout({ children }: { children: ReactNode }) {
  return (
    <div lang="en" data-content-locale="en">
      <Script id="english-document-language" strategy="beforeInteractive">
        {"document.documentElement.lang = 'en';"}
      </Script>
      {children}
    </div>
  );
}
