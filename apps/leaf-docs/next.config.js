/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['leaf-react'])

const nextConfig = {
  reactStrictMode: true,
}

module.exports = withTM(nextConfig)
