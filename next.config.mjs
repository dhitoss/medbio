/** @type {import('next').NextConfig} */
const nextConfig = {
  // Log para verificar a configuração
  async headers() {
    console.log('Next.js config: Verificando pasta public');
    console.log('process.cwd():', process.cwd());
    console.log('public path:', join(process.cwd(), 'public'));
    return [];
  }
};

export default nextConfig;
