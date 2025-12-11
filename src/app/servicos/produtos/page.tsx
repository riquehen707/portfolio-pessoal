import { Column, Heading, Text, Schema } from "@once-ui-system/core";
import ProductShelf from "@/components/services/ProductShelf";
import { baseURL, person, products, productsPage } from "@/resources";

export async function generateMetadata() {
  return {
    title: productsPage.title,
    description: productsPage.description,
    alternates: { canonical: `${baseURL}${productsPage.path}` },
    openGraph: {
      title: productsPage.title,
      description: productsPage.description,
      url: `${baseURL}${productsPage.path}`,
      images: [{ url: `/api/og/generate?title=${encodeURIComponent(productsPage.title)}` }],
    },
  };
}

export default function ProductsPage() {
  return (
    <Column maxWidth="m" paddingTop="24" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={productsPage.title}
        description={productsPage.description}
        path={productsPage.path}
        image={`/api/og/generate?title=${encodeURIComponent(productsPage.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${productsPage.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Heading as="h1" variant="heading-strong-xl">
        {productsPage.title}
      </Heading>

      <Text onBackground="neutral-weak">{productsPage.description}</Text>

      <ProductShelf products={products} />
    </Column>
  );
}
