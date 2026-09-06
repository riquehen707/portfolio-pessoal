"use client";

import Image from "next/image";
import { useState } from "react";
import { photographerDemoMedia } from "@/content/service-landings/photographerDemoMedia";
import styles from "./PhotographerLanding.module.scss";

const filters = ["Todos", "Casamentos", "Ensaios", "Produtos"] as const;

/** Uma interface demonstrativa, sem formulário de coleta ou contatos fictícios. */
export function PhotographyDemo({ compact = false }: { compact?: boolean }) {
  const [filter, setFilter] = useState<string>("Todos");
  const visible = photographerDemoMedia.filter(
    (photo) => filter === "Todos" || photo.category === filter,
  );
  return (
    <figure className={`${styles.demo} ${compact ? styles.compact : styles.fullDemo}`}>
      <div className={styles.browserBar} aria-hidden="true">
        <span>● ● ●</span>
        <span>SEU PORTFÓLIO / TRABALHOS</span>
      </div>
      <div className={styles.previewBody}>
        <div className={styles.previewBrand}>
          <strong>
            Seu nome<span>FOTOGRAFIA</span>
          </strong>
          <span>Um olhar. Muitas histórias.</span>
        </div>
        {compact ? (
          <p className={styles.previewIntro}>
            Imagens que dizem
            <br />
            quem você é.
          </p>
        ) : (
          <p className={styles.previewIntro}>Uma seleção do seu olhar.</p>
        )}
        {!compact && (
          <div className={styles.filters} role="group" aria-label="Filtrar fotos da demonstração">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        )}
        <div className={styles.photoGrid} data-single={visible.length === 1}>
          {visible.map((photo, index) => (
            <div key={photo.src} className={styles.photo}>
              <Image
                src={photo.src}
                width={photo.width}
                height={photo.height}
                alt={photo.alt}
                sizes={
                  compact ? "(max-width: 720px) 40vw, 240px" : "(max-width: 720px) 85vw, 360px"
                }
                priority={compact && index === 0}
              />
              <span>{photo.category}</span>
            </div>
          ))}
        </div>
        {!compact && (
          <div className={styles.previewContact}>
            <span>Gostou do meu trabalho?</span>
            <span>Contato por formulário e WhatsApp</span>
          </div>
        )}
        {!compact && (
          <p className={styles.filterStatus} role="status">
            {visible.length} {visible.length === 1 ? "foto de exemplo" : "fotos de exemplo"} ·{" "}
            {filter}
          </p>
        )}
      </div>
      <figcaption>
        Exemplo de apresentação com fotos de banco. Seu portfólio terá suas próprias imagens.
      </figcaption>
    </figure>
  );
}
