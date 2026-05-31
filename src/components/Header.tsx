"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { Flex, Icon, Row, Text } from "@once-ui-system/core";
import { usePathname } from "next/navigation";

import { about, blog, display, person, productsPage, work } from "@/resources";

import { BrandSignature } from "./BrandSignature";
import { GlobalSearch } from "./GlobalSearch";
import styles from "./Header.module.scss";
import type { GlobalSearchItem } from "@/lib/globalSearch";

const navItems = [
  { href: "/", label: "Início", icon: "home" },
  { href: work.path, label: "Projetos", icon: "grid" },
  { href: about.path, label: "Sobre", icon: "person" },
  { href: blog.path, label: "Blog", icon: "book" },
  { href: productsPage.path, label: "Produtos", icon: "package" },
] as const;

function TimeDisplay({ timeZone, locale = "pt-BR" }: { timeZone: string; locale?: string }) {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat(locale, {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const updateTime = () => {
      setCurrentTime(formatter.format(new Date()));
    };

    updateTime();
    const intervalId = window.setInterval(updateTime, 1_000);

    return () => window.clearInterval(intervalId);
  }, [locale, timeZone]);

  return <>{currentTime}</>;
}

function getLocationLabel(timeZone: string) {
  if (timeZone === "America/Bahia") {
    return "Bahia / BR";
  }

  return timeZone.replace(/^America\//, "").replaceAll("_", " / ");
}

type HeaderProps = {
  searchItems: GlobalSearchItem[];
};

export function Header({ searchItems }: HeaderProps) {
  const pathname = usePathname() ?? "";
  const aboutSelected = pathname === about.path || pathname.startsWith(`${about.path}/`);

  return (
    <header className={styles.position}>
      <Flex className={`${styles.sideRail} ${styles.leftRail}`} fillWidth vertical="center">
        <BrandSignature href="/" compact className={styles.brandSignature} />
        {display.location && (
          <Text className={styles.location} variant="body-default-s" onBackground="neutral-weak">
            {getLocationLabel(person.location)}
          </Text>
        )}
      </Flex>

      <nav className={styles.navShell} aria-label="Menu principal">
        <div className={styles.navRow}>
          {navItems.map((item) => {
            const isActive =
              item.href === about.path
                ? aboutSelected
                : item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

            return (
              <Link
                className={styles.navButton}
                data-active={isActive}
                href={item.href}
                key={item.href}
              >
                <Icon name={item.icon} size="xs" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <Flex
        className={`${styles.sideRail} ${styles.rightRail}`}
        fillWidth
        horizontal="end"
        vertical="center"
      >
        <GlobalSearch items={searchItems} />
        {display.time && (
          <Row className={styles.utility} gap="8" vertical="center" s={{ hide: true }}>
            <Text className={styles.timeValue} variant="body-default-s">
              <TimeDisplay timeZone={person.location} />
            </Text>
          </Row>
        )}
      </Flex>
    </header>
  );
}
