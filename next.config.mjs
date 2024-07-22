/** @type {import('next').NextConfig} */
const nextConfig = {
        images: {
            remotePatterns: [{
                protocol: 'https',
                hostname: "cf.bstatic.com",
            }]
    }
};


export default nextConfig;
