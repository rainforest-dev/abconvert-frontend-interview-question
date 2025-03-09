import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { Footer, Header } from "@/components";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Venue Theme Morning",
  description:
    "Venue is the perfect theme for ambitious brands who need a store that will grow with them. Battle tested by thousands of merchants, Venue won't let you down.",
  openGraph: {
    images: ["/images/e-commerce-preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
