import Image from "next/image";
import type { ReadingWork } from "@/content/reading/readingSchema";

type ReadingImage = ReadingWork["image"];

export function ReadingCardMedia({ image, title, className, fallbackClassName, sizes }: {
  image?: ReadingImage;
  title: string;
  className: string;
  fallbackClassName: string;
  sizes: string;
}) {
  return <div className={className} data-placeholder={!image || undefined}>
    {image
      ? <Image src={image.src} alt={image.alt} fill sizes={sizes} />
      : <span className={fallbackClassName} aria-label={`Capa ainda não cadastrada para ${title}`}>Sem capa<br/>cadastrada</span>}
  </div>;
}
