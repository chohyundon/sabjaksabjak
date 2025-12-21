import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Header from "@/app/components/Header/Header";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.ttf",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "Sabjak",
  description: "Sabjak",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretendard.className} colors w-10/15 mx-auto`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
