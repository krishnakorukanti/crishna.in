import React from "react";
import Link from "next/link";

interface FooterLink {
  name: string;
  href: string;
}

interface FooterSectionProps {
  navigation: FooterLink[];
}

export default function FooterSection({ navigation }: FooterSectionProps) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-12 px-4 bg-zinc-950/60 backdrop-blur-sm border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Crishna K.
            </Link>
            <p className="text-zinc-400 mt-2">
              Software Engineer & UI/UX Enthusiast
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-zinc-400 hover:text-zinc-300 transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center text-zinc-500 text-sm">
          <p>
            © {currentYear} Crishna Korukanti. All rights reserved.
          </p>
          
          <div className="mt-4 md:mt-0 flex gap-6">
            <Link href="/privacy" className="hover:text-zinc-300 transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-zinc-300 transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="/dashboard" className="hover:text-zinc-300 transition-colors duration-300">
              SEO Dashboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 