import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	experimental: {
		mdxRs: true,
	},
};
module.exports = {
	reactStrictMode: true,
	images: {
		domains: ['crishna.in'], //make it 'your-domain.com'
	},
};

export default withContentlayer(nextConfig);
