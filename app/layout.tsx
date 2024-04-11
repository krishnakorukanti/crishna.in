import "../global.css";
import {Inter} from "@next/font/google";
import LocalFont from "@next/font/local";
import {Metadata} from "next";
import {BeamAnalytics} from "./components/beamAnalytics";
import {Analytics} from "@vercel/analytics/react";
import {SpeedInsights} from "@vercel/speed-insights/next";

export const metadata: Metadata = {
    title: {
        default: "Software Engineer | crishna.in",
        template: "%s | crishna.in",
    },
    description: "I'm a Software Engineer, Passionate about creating intuitive user experiences and building scalable solutions across platforms.",
    openGraph: {
        title: "Software Engineer | crishna.in",
        description:
            "I'm a Software Engineer, Passionate about creating intuitive user experiences and building scalable solutions across platforms.",
        url: "https://crishna.in",
        siteName: "crishna.in",
        images: [
            {
                url: "https://crishna.in/og.png",
                width: 1920,
                height: 1080,
            },
        ],
        locale: "en-US",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    twitter: {
        title: "Software Engineer - crishna_k",
        card: "summary_large_image",
    },
    icons: {
        shortcut: "/favicon.png",
    },
    keywords: "Crishna, Sai Krishna, Sai Krishna Korukanti, Crishna Korukanti,Software Engineer, Android Developer, Mobile Developer, Full Stack Developer, Portfolio, crishna.in,",

};
const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const calSans = LocalFont({
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
