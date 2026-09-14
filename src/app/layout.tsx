import "./globals.css";
import { DM_Sans } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import LayoutWrapper from "@/components/LayoutWrapper";
import { createClient } from "@/lib/supabase/server";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata = {
  title: "Grafikantin - Pesan Menu Favoritmu",
  description: "Kantin Digital SMKN 4 Malang",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let initialUser: { id: string; email?: string | null } | null = null;
  let initialPhoto: string | null = null;

  if (user) {
    initialUser = { id: user.id, email: user.email };
    const { data: profile } = await supabase
      .from("users")
      .select("foto")
      .eq("id", user.id)
      .single();
    if (profile?.foto) initialPhoto = profile.foto;
  }

  return (
    <html lang="id" className={`scroll-smooth ${dmSans.variable}`} suppressHydrationWarning>
      <body
        className="min-h-screen flex flex-col justify-between bg-[#fafafa] font-sans antialiased"
        suppressHydrationWarning
      >
        <CartProvider>
          <LayoutWrapper initialUser={initialUser} initialPhoto={initialPhoto}>
            {children}
          </LayoutWrapper>
        </CartProvider>
      </body>
    </html>
  );
}