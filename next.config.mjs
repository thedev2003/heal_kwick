/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
	  domains: ['localhost', 'your-domain.com'],
	},
	experimental: {
	  serverActions: true,
	},
  };
  
  export default nextConfig;