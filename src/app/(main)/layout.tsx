import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import GoogleSignOutButton from "@/components/SharedComponents/GoogleSignOutButton";

import Link from "next/link";

export const metadata: Metadata = {
  title: "Rocket Works Case Study",
  description: "Implemented with Next.js and Firebase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {" "}
        <header className="bg-gray-800 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
              <nav className="md:flex space-x-10">
                <Link href="/walletTopup" passHref>
                  Top Up Wallet
                </Link>
                <Link href="/purchasableItemList" passHref>
                  Purchase Items
                </Link>
                <Link href="/transactionHistory" passHref>
                  Transaction History
                </Link>
              </nav>
              <div className="flex justify-end lg:w-0 lg:flex-1">
                <GoogleSignOutButton />
              </div>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
