import Link from "next/link";
import { FaPen } from "react-icons/fa6";
import { LinkButton } from "../button/LinkButton";
import HeaderMenu from "../headerMenu/HeaderMenu";
import { headers } from "next/headers";
import { APP_TITLE, ContentsPath, UserAccountType } from "@/constants/types";
import { getPathnameWithHeaderBtn } from "@/lib/utils/util";
import ButtonAvatarContainer from "./ButtonAvatarContainer";
import Image from "next/image";
import { getServSession } from "@/lib/auth";
import { isPostCreator } from "@/lib/services/isPostCreator";

const Header = async () => {
  let actionButton: JSX.Element;
  const pathname: string = headers().get("x-pathname") || "";
  const { post_id, buttonPath } = getPathnameWithHeaderBtn(pathname);

  // 認証情報取得
  const session = await getServSession();

  const userAccount: UserAccountType = {
    id: (session?.user.id as string) ?? "",
    name: (session?.user.name as string) ?? "",
    email: (session?.user.email as string) ?? "",
    image: (session?.user.image as string) ?? "",
  };

  let newBtnVisible = "hidden";
  let editBtnVisible = "hidden";
  if (userAccount.id) {
    newBtnVisible = "";
    if (post_id) {
      const creator = await isPostCreator(post_id, userAccount.id);
      editBtnVisible = creator.isCreator ? "" : "hidden";
    }
  }

  switch (true) {
    case pathname === ContentsPath.TOP:
      actionButton = (
        <LinkButton
          prefetch={false}
          href={buttonPath}
          className={`flex items-center px-4 py-3 ${newBtnVisible} `}
        >
          <div className="pl-2 pr-1 md:px-2">
            <FaPen className="inline size-3 md:size-5" />
          </div>
          <div>投稿する</div>
        </LinkButton>
      );
      break;
    case pathname.startsWith(ContentsPath.DETAIL):
      actionButton = (
        <LinkButton
          prefetch={false}
          href={buttonPath}
          className={`flex items-center px-4 py-3 ${editBtnVisible} `}
        >
          <div className="pl-2 pr-1 md:px-2">
            <FaPen className="inline size-3 md:size-5" />
          </div>
          <div>編集する</div>
        </LinkButton>
      );
      break;
    default:
      actionButton = (
        <div className="pl-3 pr-1 md:pr-2">
          <div className="inline size-3 md:size-5"></div>
        </div>
      );
  }

  return (
    <header className="relative h-16 border-b-2 bg-secondary pl-2 md:px-12">
      <div className="flex h-full items-center justify-between pl-0 pr-4 md:px-8">
        <div className="flex items-center gap-4">
          {/* スマホ用ヘッダメニュー */}
          <HeaderMenu />
          <Link href="/" className="border-none bg-transparent outline-none">
            <div className="flex items-center justify-start">
              <div className="fixed h-16 w-16">
                <Image
                  src={"/fishing_top.png"}
                  alt="画像"
                  fill
                  className="object-cover"
                />
              </div>
              <h1 className="rounded-2xl bg-white/30 p-2 text-base text-neutral backdrop-blur-sm md:ml-20 md:text-3xl md:font-medium">
                {/* タイトル */}
                {APP_TITLE}
              </h1>
            </div>
          </Link>
        </div>
        <div>
          {/* アクションボタンとサイイン用アバター */}
          <ButtonAvatarContainer
            actionButton={actionButton}
            userAccount={userAccount}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
