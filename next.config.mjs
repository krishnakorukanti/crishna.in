import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	reactStrictMode: true,
	experimental: {
		mdxRs: true,
	},
};


export default withContentlayer(nextConfig);
