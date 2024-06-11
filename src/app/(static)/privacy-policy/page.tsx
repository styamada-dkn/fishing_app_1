import Header from "@/app/components/header/Header";
import { APP_TITLE } from "@/constants/types";
import classNames from "classnames";
import React from "react";

const PrivacyPolicy = () => {
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
              <h2 className="mb-4 pl-3 text-lg font-semibold md:text-2xl pb-2 border-b border-secondary">
                プライバシーポリシー
              </h2>
              <div className="px-4 leading-normal">
                <p className="leading-loose">【サイト名】 {APP_TITLE}</p>
                <p className="leading-loose">
                  【サイト名】(以下「当サイト」)のプライバシーポリシー・免責事項を次の通り記載します。
                </p>
                <h3 className="mb-2 mt-3 text-success">
                  個人情報の利用目的について
                </h3>
                <p>
                  当サイトでは、ユーザー認証の際に個人情報を入力いただく場合がありますが、個人情報の収集を
                  行わないように務めております。
                </p>
                <p>
                  しかし万が一、意図せず個人情報を取得してしまった場合、取得した個人情報は、速やかに破棄又は
                  必要な場合に連絡のみに利用させていただくもので、これらの目的以外では利用いたしません。
                </p>
                <h3 className="mb-2 mt-3 text-success">Cookieの使用について</h3>
                <p>当サイトでは、ユーザー認証にCookieを使用しています</p>
                <p>
                  Cookieによりユーザーを識別していますが、特定の個人の識別はできない状態で匿名性が保たれています。
                </p>
                <p>
                  Cookieの使用を望まない場合、ブラウザからCookieを無効に設定できます。
                </p>
                <h3 className="mb-2 mt-3 text-success">免責事項</h3>
                <p>
                  当サイトは、掲載内容によって生じた損害に対する一切の責任を負いません。
                </p>
                <p>
                  各コンテンツでは、できる限り正確な情報提供を心がけておりますが、正確性や安全性を保証するものではありません。
                </p>
                <p>
                  また、リンク先の他サイトで提供される情報・サービスについても、責任を負いかねますのでご了承ください。
                </p>
                <h3 className="mb-2 mt-3 text-success">著作権</h3>
                <p>
                  当サイトに掲載されている文章・画像の著作権は、運営者に帰属しています。
                </p>
                <p>
                  法的に認められている引用の範囲を超えて、無断で転載することを禁止します。
                </p>
                <h3 className="mb-2 mt-3 text-success">
                  プライバシーポリシーの変更
                </h3>
                <p>
                  当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本プライバシーポリシーの内容を適宜見直して改善に努めます。
                </p>
                <p>
                  修正された最新のプライバシーポリシーは常に本ページにて開示されます。
                </p>
                <div className="mt-4 flex flex-col justify-center">
                  <p>
                    <span className="pr-2">制定日:</span>2024年6月11日
                  </p>
                  <p>
                    <span className="pr-2">改定日:</span>2024年6月11日
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
