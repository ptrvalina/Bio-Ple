import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "BioPole AgroPulse",
  description: "Пульт агронома — дашборд полей, погоды и операций",
  applicationName: "BioPole AgroPulse",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AgroPulse",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0B1220",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
