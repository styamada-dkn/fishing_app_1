"use client";
import { Button } from "@/app/components/button/Button";
import { APP_TITLE } from "@/constants/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const SignInError = () => {
  const router = useRouter();

  return (
    <>
      <div>
        <div className="flex h-[calc(100vh-_2.75rem)]">
          <div className="bg-primary flex-1  w-full text-sm md:text-lg">
            <div className="mt-10 mx-2 min-h-60 rounded-lg bg-secondary text-neutral flex flex-col justify-center items-center">
              <div className="flex items-center justify-start">
                <div className="absolute w-14 h-14">
                  <Image
                    src={"/fishing_top.png"}
                    alt="画像"
                    fill
                    className="object-contain"
                  />
                </div>
                <h1 className="text-lg md:text-2xl font-bold p-10 ml-5">
                  {APP_TITLE}
                </h1>
              </div>
              <div>ログインに失敗しました。</div>
              <div>ユーザー名、パスワードが正しいかご確認ください。</div>
              <Button
                size="medium"
                onClick={() => {
                  router.refresh();
                  router.push("/signin");
                }}
                className="my-10"
              >
                <label className="text-sm md:text-lg px-4 md:px-7 font-semibold cursor-pointer">
                  戻る
                </label>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInError;
