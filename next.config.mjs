/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Every photograph is served from `public/`, so no remote hosts are needed.
    localPatterns: [{ pathname: "/**", search: "" }],
    // Required from Next 16: only these quality values may be requested.
    // 90 is reserved for the hero and the project lightbox.
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
