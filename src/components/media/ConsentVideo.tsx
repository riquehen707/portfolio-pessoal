"use client";

import { useState } from "react";
import styles from "./ConsentVideo.module.scss";

type Props = { youtubeId: string; title: string; sourceUrl: string };

export function ConsentVideo({ youtubeId, title, sourceUrl }: Props) {
  const [active, setActive] = useState(false);

  return <div className={styles.video} data-loaded={active}>
    {active ? <iframe src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`} title={title} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /> : <div className={styles.placeholder}>
      <span aria-hidden="true" />
      <div><strong>{title}</strong><p>O player do YouTube só será carregado depois da sua escolha.</p><button type="button" onClick={() => setActive(true)}>Carregar vídeo</button></div>
    </div>}
    <p className={styles.note}>Ao carregar, o YouTube pode receber dados da conexão. <a href={sourceUrl} target="_blank" rel="noreferrer">Abrir no YouTube</a>.</p>
    <noscript><p><a href={sourceUrl}>Assistir ao vídeo na página oficial</a> — o player exige JavaScript.</p></noscript>
  </div>;
}
