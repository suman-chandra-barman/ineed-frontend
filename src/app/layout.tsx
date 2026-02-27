import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { Toaster } from "sonner";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "iNeed",
  description:
    "iNeed connects you with trusted local cleaning service providers so you can book with confidence and know you’re in good hands from start to finish.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} antialiased`} suppressHydrationWarning>
        <Toaster position="top-right" richColors />
        <StoreProvider>
          <AuthProvider>{children}</AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
