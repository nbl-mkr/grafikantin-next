import "./globals.css";
import { DM_Sans } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import LayoutWrapper from "@/components/LayoutWrapper";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata = {
  title: "Grafikantin - Pesan Menu Favoritmu",
  description: "Kantin Digital SMKN 4 Malang",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`scroll-smooth ${dmSans.variable}`} suppressHydrationWarning>
      <body
        className="min-h-screen flex flex-col justify-between bg-[#fafafa] font-sans antialiased"
        suppressHydrationWarning
      >
        <CartProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </CartProvider>
      </body>
    </html>
  );
}