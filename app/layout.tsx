import type { Metadata } from 'next';
import { Inter, Lora } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });

export const metadata: Metadata = {
  title: 'Historia USaP Trainer',
  description: 'Euskarazko entrenatzailea Historia USaP/PAU ariketak praktikatzeko.',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Historia USaP',
    statusBarStyle: 'default'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="eu" className={`${inter.variable} ${lora.variable}`}>
      <body className="font-sans antialiased text-slate-950 bg-slate-50">{children}</body>
    </html>
  );
}
