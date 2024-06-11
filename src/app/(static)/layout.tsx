import Footer from "@/app/components/footer/Footer";

export default function SiteLayout({
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
