// next.config.mjs
import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: "@/mdx-components",
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  poweredByHeader: false,
  reactStrictMode: true,

  images: {
    // Os assets editoriais já são normalizados no repositório. Servi-los
    // diretamente evita que a biblioteca dependa da cota do Image Optimizer.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
    localPatterns: [{ pathname: "/api/og/generate" }, { pathname: "/images/**" }],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "**" },
      { protocol: "https", hostname: "avatars.githubusercontent.com", pathname: "**" },
    ],
  },

  async headers() {
    return [{
      source: "/images/:path*",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    }];
  },

  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },

  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false },
};

export default withMDX(nextConfig);
