import type { Metadata } from "next";
import "@/app/globals.css";
import localFont from "next/font/local";
import Layout from "@/app/components/Layout/Layout";

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
      <body className={`${pretendard.className} colors`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
