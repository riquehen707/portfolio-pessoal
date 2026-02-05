import { redirect } from "next/navigation";
import { Column, Heading, Text, Button, Row, Line, Tag } from "@once-ui-system/core";
import { auth, signOut } from "@/auth";
import { account } from "@/resources";
import { ProfileForm } from "@/components/account/ProfileForm";
import { PasswordForm } from "@/components/account/PasswordForm";
import { prisma } from "@/lib/prisma";

async function handleSignOut() {
  "use server";
  await signOut();
}

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login?next=/conta");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, image: true, bio: true, role: true },
  });
  if (!user) {
    redirect("/auth/login?next=/conta");
  }

  const roleLabel = user.role === "ADMIN" ? "Admin" : "Usuário";

  return (
    <Column maxWidth="s" paddingTop="32" gap="24">
      <Heading as="h1" variant="heading-strong-xl">
        {account.title}
      </Heading>
      <Text onBackground="neutral-weak">{account.description}</Text>

      <Column
        padding="20"
        radius="l"
        background="surface"
        style={{ background: "var(--surface-weak)" }}
        gap="12"
      >
        <Row gap="12" vertical="center">
          <Heading as="h2" variant="heading-strong-s">
            {user?.name || "Conta"}
          </Heading>
          <Tag size="s">{roleLabel}</Tag>
        </Row>
        <Text onBackground="neutral-weak">{user?.email}</Text>
        <Line maxWidth="64" />
        <form action={handleSignOut}>
          <Button type="submit" variant="secondary" size="s">
            Sair
          </Button>
        </form>
      </Column>

      <Column gap="12">
        <Heading as="h2" variant="heading-strong-s">
          Perfil
        </Heading>
        <ProfileForm
          name={user?.name}
          image={user?.image}
          bio={user?.bio}
        />
      </Column>

      <Column gap="12">
        <Heading as="h2" variant="heading-strong-s">
          Segurança
        </Heading>
        <PasswordForm />
      </Column>
    </Column>
  );
}
