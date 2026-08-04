import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isGitHubPages
    ? {
        output: "export",
        basePath: "/Renjay",
        assetPrefix: "/Renjay/",
        trailingSlash: true,
        // The static Pages build never imports the Cloudflare-only database scaffold.
        // Vinext still validates the complete app in the primary production build.
        typescript: { ignoreBuildErrors: true },
      }
    : {}),
};

export default nextConfig;
