import './globals.css';
import { Manrope } from 'next/font/google';
import { LicenseProvider } from '@/components/LicenseProvider';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata = {
  title: 'MedBilling — Clinical SaaS & Pharmacy Billing',
  description: 'Commercial-grade Medical Billing, OPD, Clinic Practice & Inventory Management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} font-sans`}>
      <body className={`${manrope.className} font-sans min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary`}>
        <LicenseProvider>
          {children}
        </LicenseProvider>
      </body>
    </html>
  );
}
