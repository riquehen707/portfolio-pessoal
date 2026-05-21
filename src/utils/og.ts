export const DISCOVER_IMAGE_WIDTH = 1600;
export const DISCOVER_IMAGE_HEIGHT = 900;
export const DISCOVER_IMAGE_ASPECT_RATIO = "16:9";

export type DiscoverImageMetadata = {
  url: string;
  width: number;
  height: number;
  alt?: string;
};

export function buildOgImage(title: string, subtitle?: string) {
  const params = new URLSearchParams();
  params.set("title", title);
  if (subtitle) {
    params.set("subtitle", subtitle);
  }
  return `/api/og/generate?${params.toString()}`;
}

export function buildDiscoverImageMetadata(
  url: string | undefined,
  alt?: string,
): DiscoverImageMetadata[] | undefined {
  if (!url) {
    return undefined;
  }

  return [
    {
      url,
      width: DISCOVER_IMAGE_WIDTH,
      height: DISCOVER_IMAGE_HEIGHT,
      alt,
    },
  ];
}
