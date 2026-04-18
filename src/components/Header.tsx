"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Fade, Flex, Line, Row, Text, ToggleButton } from "@once-ui-system/core";

import {
  about,
  blog,
  display,
  person,
  routes,
  servicesPage,
  technicalApproach,
  work,
} from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.scss";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string;
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "pt-BR" }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat(locale, options).format(now));
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

export const Header = () => {
  const pathname = usePathname() ?? "";
  const locationLabel = person.location === "America/Bahia" ? "Bahia, Brasil" : person.location;
  const aboutSelected = pathname === about.path || pathname === technicalApproach.path;

  return (
    <>
      <Fade s={{ hide: true }} fillWidth position="fixed" height="80" zIndex={9} />
      <Fade
        hide
        s={{ hide: false }}
        fillWidth
        position="fixed"
        bottom="0"
        to="top"
        height="80"
        zIndex={9}
      />
      <Row
        fitHeight
        className={styles.position}
        position="sticky"
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
        s={{
          position: "fixed",
        }}
      >
        <Row
          className={styles.meta}
          paddingLeft="12"
          fillWidth
          vertical="center"
          textVariant="body-default-s"
        >
          {display.location && (
            <Row s={{ hide: true }}>
              <Text className={styles.location} variant="body-default-s">
                {locationLabel}
              </Text>
            </Row>
          )}
        </Row>
        <Row fillWidth horizontal="center">
          <Row
            className={styles.shell}
            background="page"
            border="transparent"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
          >
            <Row
              className={styles.nav}
              gap="4"
              vertical="center"
              textVariant="body-default-s"
              suppressHydrationWarning
            >
              {routes["/"] && (
                <ToggleButton prefixIcon="home" href="/" selected={pathname === "/"} />
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              {routes["/about"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="person"
                      href="/about"
                      label={about.label}
                      selected={aboutSelected}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton prefixIcon="person" href="/about" selected={aboutSelected} />
                  </Row>
                </>
              )}
              {routes["/work"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="grid"
                      href="/work"
                      label={work.label}
                      selected={pathname.startsWith("/work")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="grid"
                      href="/work"
                      selected={pathname.startsWith("/work")}
                    />
                  </Row>
                </>
              )}
              {routes["/servicos"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="rocket"
                      href={servicesPage.path}
                      label={servicesPage.label}
                      selected={pathname.startsWith("/servicos")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="rocket"
                      href={servicesPage.path}
                      selected={pathname.startsWith("/servicos")}
                    />
                  </Row>
                </>
              )}
              {routes["/blog"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="book"
                      href="/blog"
                      label={blog.label}
                      selected={pathname.startsWith("/blog")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="book"
                      href="/blog"
                      selected={pathname.startsWith("/blog")}
                    />
                  </Row>
                </>
              )}
              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <ThemeToggle />
                </>
              )}
            </Row>
          </Row>
        </Row>
        <Flex className={styles.meta} fillWidth horizontal="end" vertical="center">
          <Flex
            className={styles.clock}
            paddingRight="12"
            horizontal="end"
            vertical="center"
            gap="20"
          >
            <Flex s={{ hide: true }}>
              {display.time && (
                <Text className={styles.time} variant="body-default-s">
                  <TimeDisplay timeZone={person.location} />
                </Text>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Row>
    </>
  );
};
