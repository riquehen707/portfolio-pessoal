import { about, baseURL, person, sameAs, schema, social } from "@/resources";

function buildAbsoluteUrl(pathOrUrl: string) {
  return new URL(pathOrUrl, baseURL).toString();
}

export function SiteStructuredData() {
  const sameAsLinks = [
    ...social.map((item) => item.link),
    ...Object.values(sameAs).filter(Boolean),
  ];

  const personData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    url: buildAbsoluteUrl(about.path),
    image: buildAbsoluteUrl(person.avatar),
    email: `mailto:${person.email}`,
    jobTitle: person.role,
    sameAs: sameAsLinks,
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: schema.name,
    description: schema.description,
    url: baseURL,
    inLanguage: "pt-BR",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personData) }}
      />
    </>
  );
}
