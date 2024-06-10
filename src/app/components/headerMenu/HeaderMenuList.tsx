import React, { FC } from "react";
import { FaFish } from "react-icons/fa";
import classNames from "classnames" 
import { CategoryItemsType, MenuItems } from "@/constants/types";
import HeaderMenuItem from "./HeaderMenuItem";
import Link from "next/link";

interface HeaderMenuListProps {
  categoryList: CategoryItemsType[] | null;
  onChangeState: () => void;
}

const HeaderMenuList: FC<HeaderMenuListProps> = ({
  categoryList,
  onChangeState,
}) => {
  const menuIconStyle = classNames(
    "size-5",
    "border-none",
    "outline-none",
    "bg-transparent",
    "text-success"
  );
  const linkStyle = classNames(
    "flex",
    "items-center",
    "font-normal",
    "text-base",
    "w-full",
    "mt-2",
    "pr-7"
  );
  const noLinkStyle = classNames(
    "flex",
    "items-center",
    "font-normal",
    "text-base",
    "w-full",
    "mt-2",
    "pr-7"
  );

  const MenuList: MenuItems[] = [
    {
      id: "1",
      link: "/",
      content: (
        <Link href="/" className={linkStyle}>
          <div className="pr-4 pl-1">
            <FaFish className={menuIconStyle} />
          </div>
          <div>
            記事投稿<span className="text-sm">（全て）</span>
          </div>
        </Link>
      ),
      subMenuList: [],
    },
    {
      id: "2",
      link: "",
      content: (
        <div className={noLinkStyle}>
          <div>（釣りジャンル）</div>
        </div>
      ),
      subMenuList: categoryList,
    },
  ];

  return (
    <div className={`absolute top-16 left-0 pl-2 min-h-fit z-20`}>
      <div className="bg-white opacity-90">
        <ul>
          {MenuList.map((item) => (
            <li key={item.id} className="w-full">
              <HeaderMenuItem
                link={item.link}
                content={item.content}
                subMenuList={item.subMenuList}
                onChangeState={onChangeState}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeaderMenuList;
