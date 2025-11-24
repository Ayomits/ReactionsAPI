import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "./components/header";

const roboto = Roboto({
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Reactions API",
  description: "Публичный API для гифок",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <Header />
        <div className="pt-4 pb-8">{children}</div>
      </body>
    </html>
  );
}
