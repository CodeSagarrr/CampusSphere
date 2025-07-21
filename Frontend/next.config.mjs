/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/v1/:path*",
                destination: "https://campussphere-project.onrender.com/v1/:path*",
            }
        ]
    }
};

export default nextConfig;
