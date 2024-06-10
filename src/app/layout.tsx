import type { Metadata } from "next";
import { notoSnasJP } from "@/constants/fonts";
import "./globals.css";
import { APP_TITLE } from "@/constants/types";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: {
    default: APP_TITLE,
    template: `%s | ${APP_TITLE}`,
  },
  description: "釣り好きの記事投稿サイトです",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* クローラーを拒否する */}
        <meta name="robots" content="noindex,nofollow" />
      </head>
      <body className={`${notoSnasJP.className} text-secondary`}>
        <Suspense fallback={<Loading />}>
          {/* ヘッダー・メインコンテンツ */}
          {children}
          {/* フッター */}
        </Suspense>
      </body>
    </html>
  );
}
