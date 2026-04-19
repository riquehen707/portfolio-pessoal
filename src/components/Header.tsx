"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Row } from "@once-ui-system/core";

import { about, blog, display, technicalApproach, work } from "@/resources";

import { CTAButton } from "./CTAButton";
import { BrandSignature } from "./BrandSignature";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.scss";

const navItems = [
  { href: "/", label: "Home" },
  { href: work.path, label: "Works" },
  { href: about.path, label: "About" },
  { href: blog.path, label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  const pathname = usePathname() ?? "";
  const [isScrolled, setIsScrolled] = useState(false);
  const aboutSelected = pathname === about.path || pathname === technicalApproach.path;
  const isSolid = pathname !== "/" || isScrolled;

  useEffect(() => {
    const syncScrollState = () => {
      setIsScrolled(window.scrollY > 12);
    };

    syncScrollState();
    window.addEventListener("scroll", syncScrollState, { passive: true });

    return () => window.removeEventListener("scroll", syncScrollState);
  }, []);

  return (
    <header className={styles.root}>
      <div className={styles.shell} data-solid={isSolid ? "true" : "false"}>
        <div className={styles.brand}>
          <BrandSignature href="/" compact className={styles.brandSignature} />
        </div>

        <nav className={styles.nav} aria-label="Navegacao principal">
          {navItems.map((item) => {
            const isActive =
              item.href === about.path
                ? aboutSelected
                : item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={styles.navLink}
                data-active={isActive ? "true" : "false"}
                data-analytics-event="nav_click"
                data-analytics-label={item.label}
                data-analytics-location="header"
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Row className={styles.actions} gap="8" vertical="center">
          {display.themeSwitcher && <ThemeToggle />}
          <CTAButton
            className={styles.cta}
            href="https://cal.com/henriquereis"
            variant="secondary"
            data-analytics-event="cta_click"
            data-analytics-label="Agendar"
            data-analytics-location="header"
            data-analytics-type="primary"
          >
            Agendar
          </CTAButton>
        </Row>
      </div>
    </header>
  );
}
