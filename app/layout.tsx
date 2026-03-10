import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ProofPath — Your Work Speaks for Itself",
  description:
    "Solve real problems. Build a living portfolio. Get hired without a CV. Join the waitlist for ProofPath.",
  openGraph: {
    title: "ProofPath — Your Work Speaks for Itself",
    description:
      "Solve real problems. Build a living portfolio. Get hired without a CV.",
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
      <body className={`${workSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
