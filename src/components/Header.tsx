"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { Flex, Icon, Row, Text } from "@once-ui-system/core";
import { usePathname } from "next/navigation";

import { about, blog, display, ecosystemAreas, person } from "@/resources";
import { publicTrailAreas } from "@/lib/knowledgeConfig";

import { BrandSignature } from "./BrandSignature";
import { GlobalSearch } from "./GlobalSearch";
import styles from "./Header.module.scss";
import type { GlobalSearchItem } from "@/lib/globalSearch";

const navItems = [
  { href: "/", label: "Início", icon: "home", key: "home" as const },
  ...ecosystemAreas.map((area) => ({
    href: area.href,
    label: area.navLabel,
    icon: area.icon,
    key: area.key,
  })),
];

const ecosystemMenuLinks = [
  {
    href: blog.path,
    title: "Biblioteca",
    description: "Guias, temas e artigos.",
  },
  {
    href: "/mapa",
    title: "Mapa de aprendizado",
    description: "Visão geral por áreas e progressão.",
  },
  {
    href: "/trilhas",
    title: "Trilhas de conteúdo",
    description: "Caminhos organizados por tema.",
  },
  {
    href: "/modelos",
    title: "Modelos de página",
    description: "Demos visuais por segmento.",
  },
  {
    href: `${blog.path}#artigos`,
    title: "Artigos recentes",
    description: "Publicações novas e revisadas.",
  },
  ...ecosystemAreas
    .filter((area) => area.key !== "biblioteca" && area.key !== "sobre")
    .map((area) => ({
      href: area.href,
      title: area.title,
      description: area.intent,
    })),
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
  const [isEcosystemMenuOpen, setIsEcosystemMenuOpen] = useState(false);
  const getIsActive = (item: (typeof navItems)[number]) => {
    if (item.key === "home") return pathname === "/";
    if (item.key === "biblioteca") {
      return (
        pathname === blog.path ||
        pathname.startsWith(`${blog.path}/`) ||
        pathname === "/mapa" ||
        pathname.startsWith("/trilhas")
      );
    }
    if (item.key === "ferramentas") {
      return pathname === item.href || pathname.startsWith(`${item.href}/`);
    }
    if (item.key === "consultoria") {
      return (
        pathname === item.href ||
        (pathname.startsWith(`${item.href}/`) && !pathname.startsWith("/servicos/produtos"))
      );
    }
    if (item.key === "sobre") {
      return pathname === about.path || pathname.startsWith(`${about.path}/`);
    }

    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  useEffect(() => {
    setIsEcosystemMenuOpen(false);
  }, [pathname]);

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
            const isActive = getIsActive(item);

            if (item.key === "biblioteca") {
              return (
                <div
                  className={styles.navItemWithMenu}
                  data-open={isEcosystemMenuOpen}
                  key={item.href}
                >
                  <button
                    type="button"
                    className={styles.navButton}
                    data-active={isActive}
                    aria-expanded={isEcosystemMenuOpen}
                    aria-haspopup="true"
                    onClick={() => setIsEcosystemMenuOpen((current) => !current)}
                  >
                    <Icon name={item.icon} size="xs" />
                    <span>{item.label}</span>
                  </button>

                  <div className={styles.megaMenu} aria-label="Explorador do ecossistema">
                    <div className={styles.megaMenuPrimary}>
                      {ecosystemMenuLinks.map((link) => (
                        <Link
                          className={styles.megaMenuLink}
                          href={link.href}
                          key={link.href}
                          onClick={() => setIsEcosystemMenuOpen(false)}
                        >
                          <strong>{link.title}</strong>
                          <span>{link.description}</span>
                        </Link>
                      ))}
                    </div>

                    <div className={styles.megaMenuTrails}>
                      <span className={styles.megaMenuLabel}>Trilhas</span>
                      <div className={styles.trailLinkGrid}>
                        {publicTrailAreas.map((area) => (
                          <Link
                            className={styles.trailLink}
                            href={area.path}
                            key={area.slug}
                            onClick={() => setIsEcosystemMenuOpen(false)}
                          >
                            {area.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

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
