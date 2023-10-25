/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  //   i18n: {
  //     locales: ["en", "vi", "ja"],
  //     defaultLocale: "en",
  //   },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'viva-cms-en.okhub.tech',
        hostname: 'viva-cms.okhub.tech'
      }
    ]
  },
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig