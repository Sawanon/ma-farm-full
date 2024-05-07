import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { FaHouseMedical } from "react-icons/fa6";
import Link from "next/link";
import { SpeedInsights } from "@vercel/speed-insights/next"

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='dark'>
      <body >
        <Providers>
          <Navbar>
            <NavbarBrand className={`space-x-2`}>
              <FaHouseMedical />
              <p className={`font-bold text-inherit`}>Ma farm</p>
            </NavbarBrand>
            <NavbarContent>
              <NavbarItem>
                <Link href="/">
                  Dashboard
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="/setting">
                  Setting
                </Link>
              </NavbarItem>
            </NavbarContent>
          </Navbar>
          {children}
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
