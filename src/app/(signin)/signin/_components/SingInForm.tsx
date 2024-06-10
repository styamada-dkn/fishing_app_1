"use client";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa6";
import { APP_TITLE } from "@/constants/types";
import { z } from "zod";
import classNames from "classnames";
import { signIn } from "next-auth/react";
import { credentialSignInSchema } from "@/constants/validationSchema";

const SignIn = () => {
  const [inputData, setInputData] = useState({ username: "", password: "" });
  const [inputVisivle, setInputVisivle] = useState(false);
  const [schemaError, setSchemaError] =
    useState<z.inferFlattenedErrors<typeof credentialSignInSchema>>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const onSubmit = (formData: FormData) => {
    try {
      const _username = formData.get("username");
      const _password = formData.get("password");

      credentialSignInSchema.parse({
        username: _username,
        password: _password,
      });
      const response = signIn("credentials", {
        username: _username,
        callbackUrl: "/",
      });
    } catch (e) {
      if (e instanceof z.ZodError) {
        setSchemaError(e.formErrors);
        return;
      }
    }
  };

  const providerBtnStyle = classNames(
    "mt-10",
    "mx-20",
    "px-4",
    "py-2",
    "text-success",
    "flex",
    "justify-center",
    "items-center",
    "cursor-pointer",
    "hover:opacity-90",
    "bg-neutral",
    "border-2",
    "border-success",
    "rounded-md",
    "shadow-md"
  );

  return (
    <>
      <div className="flex min-h-96 w-full flex-col rounded-lg bg-secondary py-4 shadow-2xl">
        {/* タイトル */}
        <div className="border-b-2 border-neutral pb-3 text-neutral">
          <h2 className="text-center text-2xl font-semibold">{APP_TITLE}</h2>
        </div>
        {/* グーグルログイン */}
        <div className={providerBtnStyle}>
          <FaGoogle className="size-5 text-success" />
          <button
            className="pl-2"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            Googleでログイン
          </button>
        </div>
        <form action={onSubmit}>
          {/* ユーザ名 */}
          <div className="mt-7 px-4">
            <label htmlFor="username" className="text-neutral">
              ユーザ名
            </label>
          </div>
          <div className="px-4">
            <input
              id="username"
              name="username"
              type="text"
              placeholder="ユーザ名を入力"
              required
              className="w-full grow rounded p-2"
              value={inputData.username}
              onChange={handleChange}
            />
          </div>
          {!!schemaError?.fieldErrors.username?.length && (
            <div className="px-4 text-error">
              {schemaError.fieldErrors.username}
            </div>
          )}
          {/* パスワード */}
          <div className="mt-7 px-4">
            <label htmlFor="password" className="text-neutral">
              パスワード
            </label>
          </div>
          <div className="px-4">
            <input
              id="password"
              name="password"
              type={inputVisivle ? "text" : "password"}
              required
              className="w-full grow rounded p-2"
              placeholder="パスワードを入力"
              value={inputData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mt-2 px-4">
            <label
              htmlFor="chkPasswordVisible"
              className="text-sm text-neutral"
            >
              <input
                type="checkbox"
                id="chkPasswordVisible"
                name="chkPasswordVisible"
                className="p-2"
                checked={inputVisivle}
                onChange={() => setInputVisivle(!inputVisivle)}
              />
              <span className="pl-2">パスワードを表示する</span>
            </label>
          </div>
          {!!schemaError?.fieldErrors.password?.length && (
            <div className="px-4 text-error">
              {schemaError.fieldErrors.password}
            </div>
          )}
          <div className="mt-6 px-4">
            <button
              type="submit"
              className="w-full cursor-pointer rounded-sm bg-accent p-2 font-semibold hover:opacity-90"
            >
              ログイン
            </button>
          </div>
        </form>
      </div>
      {/* ログインユーザーについての案内 */}
      <ul className="mt-2 flex w-full flex-col rounded-lg bg-neutral px-3 py-4 shadow-2xl">
        <li className="text-center">
          <h2 className="font-semibold">&#9733;ログインについて&#9733;</h2>
        </li>
        <li>
          <div className="mt-2">
            <p>Googleでログインしていただくか、以下の</p>
            <p>デモユーザをご使用ください。</p>
            <p className="underline">パスワード認証は行っておりませんが、</p>
            <p className="underline">
              入力チェックは行っております。下記の条件で
            </p>
            <p className="underline">適当なパスワードをご入力ください。</p>
            <h2 className="mt-2 font-semibold text-warning">
              &#9711;パスワード入力条件
            </h2>
            <p className="px-4 text-sm text-success">
              8文字以上の英数字かつアルファベットと数字が1文字以上の適当な文字
            </p>
          </div>
        </li>
        <li>
          <p className="mt-2 font-semibold text-warning">
            <span>&#9711;デモユーザー</span>
            <span className="text-sm">（全６ユーザー）</span>
          </p>
        </li>
        <li>
          <span>（１）</span>
          <span className="ml-2 rounded-xl border-none bg-secondary px-2 text-sm text-neutral">
            ユーザー名
          </span>
          <span className="ml-7 font-semibold text-success">user1</span>
        </li>
        <li>
          <span>（２）</span>
          <span className="ml-2 rounded-xl border-none bg-secondary px-2 text-sm text-neutral">
            ユーザー名
          </span>
          <span className="ml-7 font-semibold text-success">user2</span>
        </li>
        <li>
          <span>（３）</span>
          <span className="ml-2 rounded-xl border-none bg-secondary px-2 text-sm text-neutral">
            ユーザー名
          </span>
          <span className="ml-7 font-semibold text-success">user3</span>
        </li>
        <li>
          <span>（４）</span>
          <span className="ml-2 rounded-xl border-none bg-secondary px-2 text-sm text-neutral">
            ユーザー名
          </span>
          <span className="ml-7 font-semibold text-success">user4</span>
        </li>
        <li>
          <span>（５）</span>
          <span className="ml-2 rounded-xl border-none bg-secondary px-2 text-sm text-neutral">
            ユーザー名
          </span>
          <span className="ml-7 font-semibold text-success">user5</span>
        </li>
        <li>
          <span>（６）</span>
          <span className="ml-2 rounded-xl border-none bg-secondary px-2 text-sm text-neutral">
            ユーザー名
          </span>
          <span className="ml-7 font-semibold text-success">user6</span>
        </li>
      </ul>
    </>
  );
};
export default SignIn;
