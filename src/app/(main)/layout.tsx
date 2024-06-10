import Footer from "../components/footer/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="h-screen overflow-y-auto">
        {/* ヘッダー・サイドメニュー・メインコンテンツ */}
        <main>{children}</main>
        {/* フッター */}
        <Footer />
      </div>
    </>
  );
}
