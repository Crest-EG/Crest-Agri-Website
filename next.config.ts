import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { buildRedirects } from "./src/config/redirects";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  redirects: async () => buildRedirects(),
};

export default withNextIntl(nextConfig);
