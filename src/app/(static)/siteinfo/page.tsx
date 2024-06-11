import Header from "@/app/components/header/Header";
import { APP_TITLE } from "@/constants/types";
import classNames from "classnames";
import React from "react";

const SiteInfo = () => {
  const topContainerStyle = classNames([
    "m-auto",
    "w-[360px], md:w-[720px]",
    "py-3",
    "md:py-5 drop-shadow-2xl",
    "text-sm md:text-base",
  ]);
  return (
    <>
      {/* ヘッダー */}
      <Header />
      {/* メインコンテンツ */}
      <div>
        <div className="flex h-[calc(100vh-4rem_-_2.75rem)]">
          <div className="flex-1 overflow-auto bg-primary">
            <div className={topContainerStyle}>
              <div className="px-5 md:px-5 leading-relaxed">
                <h2 className="mt-4 text-base font-semibold md:text-xl">
                  このサイトは、釣り記事投稿サイト「
                  {String(APP_TITLE).replace("デモサイト", "")}
                  」の<span className="text-warning">デモサイト</span>です。
                </h2>
                <p className="mt-8">個人的なポートフォリオサイトとして作成したものであり、
                  <span className="underline">一般的なWEBサービスを提供するものではありません。</span>
                </p>
                <p>登録したデータや画像などは一方的にサイト作成者によって変更、削除される場合があります。</p>
                <p>趣旨をご理解の上、ご利用ください。</p>

                <p>尚、当サイトは以下の様な機能を備えています。</p>
                <ul className="list-disc mt-4 pl-5">
                  <li>釣り記事投稿（新規・修正・削除）</li>
                  <li>釣り画像投稿（新規・修正・削除）</li>
                  <li>コメント（新規・修正・削除）</li>
                  <li>いいね送信</li>
                  <li>ログイン認証（Googleログイン・デモユーザー）</li>
                  <li>ページネーション</li>
                  <li>カテゴリー検索</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SiteInfo;
