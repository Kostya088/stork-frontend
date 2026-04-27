import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TanStackProvider from "@/components/providers/TanStackProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import Header from "@/components/layout/Header/Header";
import { MobileSidebarOverlay } from "@/components/layout/SideBar/SideBar";
import { Toaster } from "react-hot-toast";

const lato = localFont({
  src: [
    {
      path: "../public/fonts/Lato-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Lato-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Lato-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Lato-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-lato",
  display: "swap",
});

const comfortaa = localFont({
  src: [
    {
      path: "../public/fonts/Comfortaa-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-comfortaa",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stork",
  description: "Ваш помічник на шляху до материнства",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal?: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${comfortaa.variable}`}>
      <body>
        <TanStackProvider>
          <AuthProvider>
            <div className="container">
              <Header
                showMobileButton={true}
                hideOnDesktop={true}
                hideOnAuth={true}
              />
              <main>
                {children}
                {modal}
              </main>
            </div>
            <MobileSidebarOverlay />
          </AuthProvider>
        </TanStackProvider>
        <Toaster position="top-left" />
      </body>
    </html>
  );
}
