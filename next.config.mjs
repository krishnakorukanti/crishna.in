import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	swcMinify: true,
	reactStrictMode: true,
	experimental: {
		mdxRs: true,
	},
};


export default withContentlayer(nextConfig);
