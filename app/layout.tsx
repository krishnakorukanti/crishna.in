import "../global.css";
import "./animations.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Metadata } from "next";
import { BeamAnalytics } from "./components/beamAnalytics";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { constructMetadata } from "./components/SEO";

// Default metadata
export const metadata: Metadata = constructMetadata({
    title: "Crishna | Software Engineer",
    description: "I'm a Software Engineer passionate about creating intuitive user experiences and building scalable solutions across platforms.",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const calSans = localFont({
    src: "../public/fonts/CalSans-SemiBold.ttf",
    variable: "--font-calsans",
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
        <head>
            <BeamAnalytics/>
            <link rel="sitemap" href="/sitemap.xml" />
            <link rel="alternate" type="application/rss+xml" href="/rss.xml" title="Crishna Korukanti" />
            <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
        </head>
        <body
            className={`bg-black ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
            }`}
        >
        {children}
        <Analytics/>
        <SpeedInsights/>
        </body>
        </html>
    );
}
