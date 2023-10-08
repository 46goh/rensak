import "./globals.css";
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";

const font = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rensak - 連作並び替えツール",
  description: "短歌・俳句・川柳などの連作を並び替えるツール",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={font.className}>{children}</body>
    </html>
  );
}
