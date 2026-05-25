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
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://umeedeshumaal.org"),
  title: "Umeed e Shumaal | Together We Change Lives",
  description:
    "Umeed e Shumaal - A youth-led welfare initiative supporting education, healthcare, and underprivileged families in Gilgit Baltistan, Gilgit-Baltistan, Pakistan. Founded by Fatima Baneen. Donate, volunteer, and help us build a better community.",
  keywords: [
    "Umeed e Shumaal",
    "Fatima Baneen",
    "Gilgit Baltistan charity",
    "Gilgit-Baltistan welfare",
    "Pakistan NGO",
    "education support Gilgit Baltistan",
    "healthcare Gilgit Baltistan",
    "donate Gilgit Baltistan",
    "volunteer Gilgit Baltistan",
    "underprivileged families Pakistan",
  ],
  authors: [{ name: "Umeed e Shumaal" }],
  icons: {
    icon: "/images/logo.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Umeed e Shumaal",
    description: "Together We Can Change Lives - A youth-led welfare initiative in Gilgit Baltistan, Gilgit-Baltistan, Pakistan. Founded by Fatima Baneen.",
    type: "website",
    locale: "en_PK",
    siteName: "Umeed e Shumaal",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Umeed e Shumaal",
    images: ["/images/logo.png"],
    description: "Together We Can Change Lives - Youth-led welfare initiative in Gilgit Baltistan. Founded by Fatima Baneen.",
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
