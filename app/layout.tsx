import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Renjay & Akhila | Wedding Invitation",
  description:
    "Join Dr. Renjay R.V and Dr. Akhila J Sasi as they celebrate their wedding in Thiruvananthapuram on 13 September 2026.",
  openGraph: {
    title: "Renjay & Akhila are getting married",
    description: "13 September 2026 · Thiruvananthapuram, Kerala",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
