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
  title: "Umeed e Shumaal | Together We Change Lives",
  description:
    "Umeed e Shumaal - A youth-led welfare initiative supporting education, healthcare, and underprivileged families in Skardu, Gilgit-Baltistan, Pakistan. Founded by Fatima Baneen. Donate, volunteer, and help us build a better community.",
  keywords: [
    "Umeed e Shumaal",
    "Fatima Baneen",
    "Skardu charity",
    "Gilgit-Baltistan welfare",
    "Pakistan NGO",
    "education support Skardu",
    "healthcare Skardu",
    "donate Skardu",
    "volunteer Skardu",
    "underprivileged families Pakistan",
  ],
  authors: [{ name: "Umeed e Shumaal" }],
  openGraph: {
    title: "Umeed e Shumaal",
    description: "Together We Can Change Lives - A youth-led welfare initiative in Skardu, Gilgit-Baltistan, Pakistan. Founded by Fatima Baneen.",
    type: "website",
    locale: "en_PK",
    siteName: "Umeed e Shumaal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Umeed e Shumaal",
    description: "Together We Can Change Lives - Youth-led welfare initiative in Skardu. Founded by Fatima Baneen.",
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
