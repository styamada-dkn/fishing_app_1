import type { Metadata } from "next";
import Footer from "@/app/components/footer/Footer";

export const metadata: Metadata = {
  title: "サインイン",
};

export default function SinInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen overflow-y-auto">
      {/* ヘッダー・メインコンテンツ */}
      <main>{children}</main>
      {/* フッター */}
      <Footer />
    </div>
  );
}
