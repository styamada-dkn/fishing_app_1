/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true, //ターミナルに(cache: HIT)と出ればキャッシュを利用
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "mmskkpcgscyhoiidkkgh.supabase.co",
      },
    ],
  },
};

export default nextConfig;
