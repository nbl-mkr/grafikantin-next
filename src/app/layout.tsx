import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

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
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body 
        className="min-h-screen flex flex-col justify-between bg-slate-50 font-sans antialiased"
        suppressHydrationWarning
      >
        <Navbar />
        <main className="grow bg-slate-50">{children}</main>
        <Footer />
      </body>
    </html>
  );
}