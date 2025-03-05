/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração básica
  output: 'standalone',
  
  // Configuração de imagens
  images: {
    domains: [
      'imagensmdbio.sfo3.digitaloceanspaces.com',
      'localhost'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.digitaloceanspaces.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
