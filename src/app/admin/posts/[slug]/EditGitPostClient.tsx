"use client";

import * as React from "react";
import { Button, Flex, Text } from "@once-ui-system/core"; // mantenha só o que existe no core

type Props = {
  initialTitle?: string;
  initialContent?: string;
  onSave?: (data: { title: string; content: string }) => Promise<void> | void;
};

export default function EditGitPostClient({
  initialTitle = "",
  initialContent = "",
  onSave,
}: Props) {
  const [title, setTitle] = React.useState(initialTitle);
  const [content, setContent] = React.useState(initialContent);
  const [loading, setLoading] = React.useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      await onSave?.({ title, content });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex direction="column" gap="m" fillWidth>
      <div>
        <Text as="label" size="s" style={{ display: "block", marginBottom: 6 }}>
          Título
        </Text>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título do post"
          style={{
            width: "100%",
            padding: "0.75rem",
            borderRadius: 10,
            border: "1px solid var(--neutral-alpha-weak)",
            background: "var(--surface-background)",
            color: "var(--neutral-on-surface-strong)",
          }}
        />
      </div>

      <div>
        <Text as="label" size="s" style={{ display: "block", marginBottom: 6 }}>
          Conteúdo (MDX)
        </Text>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Conteúdo em MDX…"
          rows={14}
          style={{
            width: "100%",
            padding: "0.75rem",
            borderRadius: 10,
            border: "1px solid var(--neutral-alpha-weak)",
            background: "var(--surface-background)",
            color: "var(--neutral-on-surface-strong)",
            lineHeight: 1.5,
          }}
        />
      </div>

      <Button onClick={handleSave} disabled={loading} emphasis="highlight">
        {loading ? "Salvando…" : "Salvar alterações"}
      </Button>
    </Flex>
  );
}
