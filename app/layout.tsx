import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import TanStackProvider from '@/components/providers/TanStackProvider';
import AuthProvider from '@/components/providers/AuthProvider';
import Header from '@/components/layout/Header/Header';
import { MobileSidebarOverlay } from '@/components/layout/SideBar/SideBar';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

const lato = localFont({
  src: [
    {
      path: '../public/fonts/Lato-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Lato-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Lato-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Lato-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-lato',
  display: 'swap',
});

const comfortaa = localFont({
  src: [
    {
      path: '../public/fonts/Comfortaa-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-comfortaa',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Stork',
  description: 'Ваш помічник на шляху до материнства',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${lato.variable} ${comfortaa.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <TanStackProvider>
          <AuthProvider>
            <ThemeProvider>
              <div className="container">
                <Header
                  showMobileButton={true}
                  hideOnDesktop={true}
                  hideOnAuth={true}
                />
                <main>{children}</main>
              </div>
              <MobileSidebarOverlay />
            </ThemeProvider>
          </AuthProvider>
        </TanStackProvider>
        <Toaster position="top-left" />
      </body>
    </html>
  );
}
