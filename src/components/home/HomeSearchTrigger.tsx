"use client";

import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import styles from "./HomeSearchTrigger.module.scss";

export function HomeSearchTrigger() {
  return (
    <button
      className={styles.trigger}
      type="button"
      onClick={() =>
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "/" }))
      }
    >
      <HiOutlineMagnifyingGlass aria-hidden="true" />
      <span>Buscar filmes, livros, quadrinhos, pessoas e ideias...</span>
      <kbd>Ctrl K</kbd>
    </button>
  );
}
