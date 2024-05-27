import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import RootProvider from "@/components/providers/root-provider";
import {Toaster} from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Budget Tracker",
  description: "Track your budget with this app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <ClerkProvider>
    <html lang="en" className="dark" style={{colorScheme: "dark"}}>
      <body className={inter.className}>
        <RootProvider>{children}</RootProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  </ClerkProvider>
  );
}
