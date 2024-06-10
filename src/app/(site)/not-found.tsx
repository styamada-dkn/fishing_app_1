import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/require-await
export default async function NotFoundPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-50 text-gray-900">
      <h1 className="text-4xl font-bold">404 Page Not Found</h1>
      <p className="mt-4 text-4xl font-medium">
        お探しのページは見つかりませんでした
      </p>
      <Link href="/" className="mt-6 text-2xl text-blue-600 hover:underline">
        ホーム画面に戻る
      </Link>
    </div>
  );
}
