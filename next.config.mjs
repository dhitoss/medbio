import { join } from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para servir arquivos estáticos
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: join(process.cwd()),
  },
  // Configuração para servir arquivos estáticos
  distDir: '.next',
  // Configuração específica para a pasta uploads
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: '/public/uploads/:path*',
      },
    ];
  },
  // Log para verificar a configuração
  async headers() {
    console.log('Next.js config: Verificando pasta public');
    console.log('process.cwd():', process.cwd());
    console.log('public path:', join(process.cwd(), 'public'));
    return [];
  }
};

export default nextConfig;
