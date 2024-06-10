"use client";
import { FC, ReactNode, useState } from "react";
import Avatar from "../avatar/Avatar";
import { Button } from "../button/Button";
import { ContentsPath, UserAccountType } from "@/constants/types";
import { LinkButton } from "../button/LinkButton";
import { signOut } from "next-auth/react";

interface ButtonAvatarContainerProps {
  actionButton?: ReactNode;
  userAccount: UserAccountType;
}

const ButtonAvatarContainer: FC<ButtonAvatarContainerProps> = ({
  actionButton,
  userAccount = {
    id: "",
    name: "",
    email: "",
    image: "",
  },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const changeState = () => {
    setIsOpen((prev) => !prev);
  };

  const SignOutButton = ({ userAccount }: ButtonAvatarContainerProps) => (
    <>
      <ul className="flex flex-col items-center justify-center rounded bg-neutral text-xs">
        <li className="mt-2">
          <div className="">
            <div>あなたは</div>
            <div>
              <span className="text-error">
                「{userAccount.name}
                <span className="text-success">(ID:{userAccount.id})</span>」
              </span>
            </div>
            <div>でログイン中です</div>
          </div>
        </li>
        <li className="mt-2">
          <div>
            <div>Eメール:</div>
            <div>
              <label>
                <span>{userAccount.email}</span>
              </label>
            </div>
          </div>
        </li>
        <li className="my-2">
          <Button
            size="small"
            disabled={false}
            className="w-auto rounded-md text-sm"
            onClick={() => {
              void signOut({ callbackUrl: "/" });
            }}
          >
            ログアウト
          </Button>
        </li>
      </ul>
    </>
  );

  return (
    <>
      <div className="relative flex h-auto items-center gap-1 md:gap-4">
        {isOpen && (
          <div
            onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
            className="fixed left-0 top-0 z-30 h-full w-full bg-gray-600 opacity-70"
          ></div>
        )}

        <div className="">
          {/* ボタンコンポーネント */}
          {actionButton}
        </div>

        <div className="z-30 h-auto w-14 md:w-16">
          <div className="relative h-full w-full cursor-pointer">
            {/* アバター画像 */}
            <button
              onClick={changeState}
              title={`${!userAccount.id ? "ログインする" : "ログアウトする"}`}
            >
              <Avatar
                imageUrl={`${
                  !userAccount.image ? "/default_avatot.jpg" : userAccount.image
                }`}
                size="medium"
                useLoader={false}
              />
            </button>
          </div>

          <>
            {/* ログイン済みでかつ開いていない時 */}
            {isOpen &&
              (userAccount.id === "" ? (
                <div className="absolute right-0 top-16 z-30 bg-transparent opacity-85">
                  <LinkButton
                    prefetch={false}
                    href={ContentsPath.SIGNIN}
                    size="small"
                    className="text-xs md:px-2 md:py-1 md:text-sm"
                  >
                    ログイン
                  </LinkButton>
                </div>
              ) : (
                <div className="absolute right-0 top-16 z-30 w-auto bg-transparent opacity-85">
                  <SignOutButton userAccount={userAccount} />
                </div>
              ))}
          </>
        </div>
      </div>
    </>
  );
};

export default ButtonAvatarContainer;
