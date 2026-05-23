import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Skardu Youth Welfare Foundation | SYWF - Together We Change Lives",
  description:
    "A youth-led welfare initiative supporting education, healthcare, and underprivileged families in Skardu, Gilgit-Baltistan, Pakistan. Donate, volunteer, and help us build a better community.",
  keywords: [
    "SYWF",
    "Skardu Youth Welfare Foundation",
    "Skardu charity",
    "Gilgit-Baltistan welfare",
    "Pakistan NGO",
    "education support Skardu",
    "healthcare Skardu",
    "donate Skardu",
    "volunteer Skardu",
    "underprivileged families Pakistan",
  ],
  authors: [{ name: "Skardu Youth Welfare Foundation" }],
  openGraph: {
    title: "Skardu Youth Welfare Foundation",
    description: "Together We Can Change Lives - A youth-led welfare initiative in Skardu, Gilgit-Baltistan, Pakistan.",
    type: "website",
    locale: "en_PK",
    siteName: "SYWF",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skardu Youth Welfare Foundation",
    description: "Together We Can Change Lives - Youth-led welfare initiative in Skardu.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
