/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	reactStrictMode: true,
	experimental: {
		mdxRs: true,
	},
	async rewrites() {
		return [
			{
				source: "/public/persona-ai.html",
				destination: "/pages/api/persona-ai.ts",
			},
		];
	},
};


export default nextConfig;
