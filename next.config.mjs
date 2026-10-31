// Ensure a valid URL protocol exists during build time if env is empty
if (
  !process.env.DATABASE_URL ||
  (!process.env.DATABASE_URL.startsWith("postgres://") &&
    !process.env.DATABASE_URL.startsWith("postgresql://"))
) {
  process.env.DATABASE_URL =
    "postgresql://postgres:postgres@localhost:5432/lead_db?schema=public";
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
