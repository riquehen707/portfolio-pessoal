"use client";

import { Fragment, useEffect, useState } from "react";

import { Flex, Line, Row, Text, ToggleButton, useTheme } from "@once-ui-system/core";
import { usePathname } from "next/navigation";

import { about, blog, contact, display, person, technicalApproach, work } from "@/resources";

import { BrandSignature } from "./BrandSignature";
import styles from "./Header.module.scss";

const navItems = [
  { href: "/", label: "Início", icon: "home" },
  { href: work.path, label: "Projetos", icon: "grid" },
  { href: about.path, label: "Sobre", icon: "person" },
  { href: blog.path, label: "Blog", icon: "book" },
  { href: contact.path, label: "Contato", icon: "email" },
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

export function Header() {
  const pathname = usePathname() ?? "";
  const { theme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("dark");
  const aboutSelected = pathname === about.path || pathname === technicalApproach.path;

  useEffect(() => {
    setCurrentTheme(document.documentElement.getAttribute("data-theme") || "dark");
  }, []);

  useEffect(() => {
    setCurrentTheme(document.documentElement.getAttribute("data-theme") || "dark");
  }, [theme]);

  const nextTheme = currentTheme === "light" ? "dark" : "light";
  const themeIcon = currentTheme === "dark" ? "light" : "dark";
  const nextThemeLabel = nextTheme === "light" ? "claro" : "escuro";

  return (
    <Row
      className={styles.position}
      position="sticky"
      as="header"
      zIndex={9}
      fillWidth
      padding="8"
      horizontal="center"
      s={{ position: "fixed" }}
    >
      <Flex className={styles.sideRail} fillWidth vertical="center">
        <BrandSignature href="/" compact className={styles.brandSignature} />
        {display.location && (
          <Text className={styles.location} variant="body-default-s" onBackground="neutral-weak">
            {getLocationLabel(person.location)}
          </Text>
        )}
      </Flex>

      <Row
        className={styles.navShell}
        background="page"
        border="neutral-alpha-weak"
        radius="xl"
        shadow="l"
        padding="4"
        horizontal="center"
        zIndex={1}
      >
        <Row className={styles.navRow} gap="4" vertical="center" textVariant="body-default-s">
          {navItems.map((item, index) => {
            const isActive =
              item.href === about.path
                ? aboutSelected
                : item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

            return (
              <Fragment key={item.href}>
                <Row s={{ hide: true }}>
                  <ToggleButton
                    className={styles.navButton}
                    prefixIcon={item.icon}
                    href={item.href}
                    label={item.label}
                    selected={isActive}
                  />
                </Row>
                <Row hide s={{ hide: false }}>
                  <ToggleButton
                    className={styles.navButton}
                    prefixIcon={item.icon}
                    href={item.href}
                    selected={isActive}
                  />
                </Row>
                {index === 0 && <Line className={styles.divider} background="neutral-alpha-medium" vert maxHeight="24" />}
              </Fragment>
            );
          })}

          {display.themeSwitcher && (
            <>
              <Line className={styles.divider} background="neutral-alpha-medium" vert maxHeight="24" />
              <ToggleButton
                className={styles.themeButton}
                prefixIcon={themeIcon}
                onClick={() => setTheme(nextTheme)}
                aria-label={`Mudar para tema ${nextThemeLabel}`}
              />
            </>
          )}
        </Row>
      </Row>

      <Flex className={styles.sideRail} fillWidth horizontal="end" vertical="center">
        {display.time && (
          <Row className={styles.utility} gap="8" vertical="center" s={{ hide: true }}>
            <Text className={styles.timeLabel} variant="body-default-s" onBackground="neutral-weak">
              Agora
            </Text>
            <Text className={styles.timeValue} variant="body-default-s">
              <TimeDisplay timeZone={person.location} />
            </Text>
          </Row>
        )}
      </Flex>
    </Row>
  );
}
