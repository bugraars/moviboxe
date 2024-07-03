// app/layout.tsx
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/navbar/page';
import Footer from '@/components/footer/page';
import { SearchProvider } from '@/context/searchContext';
import { TranslationProvider } from '@/context/translationContext';

const dmSans = DM_Sans({
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: "MovieBox",
  description: "All about movies",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  return (
    <html lang={locale}>
      <body className={dmSans.className}>
        <TranslationProvider>
          <SearchProvider>
            <Navbar />
            {children}
            <Footer />
          </SearchProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
