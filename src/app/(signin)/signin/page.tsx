import Header from "@/app/components/header/Header";
import React from "react";
import classNames from "classnames" 
import SignIn from "./_components/SingInForm";

const SignInContainer = () => {
  const topContainerStyle = classNames([
    "m-auto",
    "w-[360px]",
    "py-3",
    "md:py-5 drop-shadow-2xl",
  ]);
  return (
    <>
      {/* ヘッダー */}
      <Header />
      {/* メインコンテンツ */}
      <div>
        <div className="flex h-[calc(100vh-4rem_-_2.75rem)]">
          <div className="bg-primary flex-1 overflow-auto">
            <div className={topContainerStyle}>
              <SignIn />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInContainer;
