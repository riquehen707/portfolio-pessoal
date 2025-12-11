"use client";

import { useMemo, useState } from "react";
import { Column, Heading, Text, Button, Row, Line } from "@once-ui-system/core";
import { ProductItem } from "@/types";

const parsePrice = (value: string): number => {
  const numeric = value
    .replace(/[^\d,.-]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  const parsed = parseFloat(numeric);
  return Number.isFinite(parsed) ? parsed : 0;
};

type ProductShelfProps = {
  products: ProductItem[];
};

export default function ProductShelf({ products }: ProductShelfProps) {
  const [cart, setCart] = useState<ProductItem[]>([]);

  const total = useMemo(() => {
    return cart.reduce((acc, item) => acc + parsePrice(item.price), 0);
  }, [cart]);

  const totalLabel =
    total > 0
      ? `R$ ${total.toFixed(2).replace(".", ",")}`
      : "R$ 0,00";

  const handleAdd = (item: ProductItem) => {
    setCart((prev) => [...prev, item]);
  };

  return (
    <Column gap="24">
      <Heading as="h2" variant="heading-strong-xl">
        Carrinho rápido
      </Heading>

      <Row gap="16" s={{ direction: "column" }}>
        {products.map((product) => (
          <Column
            key={product.slug}
            fillWidth
            gap="12"
            padding="20"
            radius="m"
            background="surface-weak"
          >
            <Row justify="between" gap="16">
              <div>
                <Heading as="h3" variant="heading-strong-s">
                  {product.title}
                </Heading>
                <Text onBackground="neutral-weak">{product.format}</Text>
              </div>
              <Column gap="4" align="end">
                <Text variant="heading-strong-s">{product.price}</Text>
                <Text onBackground="neutral-weak">{product.priceLabel}</Text>
              </Column>
            </Row>

            <Text>{product.summary}</Text>

            <Column as="ul" gap="4">
              {product.deliverables.map((deliverable) => (
                <Text key={deliverable} as="li" variant="body-default-s">
                  {deliverable}
                </Text>
              ))}
            </Column>

            <Row gap="12">
              <Button variant="primary" size="s" onClick={() => handleAdd(product)}>
                Adicionar ao carrinho
              </Button>
              <Button href={product.link} variant="secondary" size="s" arrowIcon>
                Comprar agora
              </Button>
            </Row>
          </Column>
        ))}
      </Row>

      <Column gap="8" padding="20" radius="m" background="surface-strong">
        <Heading as="h3" variant="heading-strong-s">
          Total estimado
        </Heading>
        <Text variant="heading-strong-m">{totalLabel}</Text>
        <Text onBackground="neutral-weak">Itens adicionados: {cart.length}</Text>
        {cart.length > 0 && (
          <Column as="ul" gap="4">
            {cart.map((item, index) => (
              <Row key={`${item.slug}-${index}`} gap="8" wrap>
                <Text variant="body-default-s">{item.title}</Text>
                <Text variant="label-default-s" onBackground="neutral-weak">
                  {item.price}
                </Text>
              </Row>
            ))}
          </Column>
        )}
        <Line maxWidth="64" />
        <Text onBackground="neutral-weak">
          Esse carrinho é uma prévia para entender o investimento e compartilhar com leads. Cada produto redireciona para checkout padrão.
        </Text>
      </Column>
    </Column>
  );
}
