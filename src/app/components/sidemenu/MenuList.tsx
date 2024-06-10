import React, { FC } from "react";
import { FaFish } from "react-icons/fa";
import MenuItem from "./MuenuItem";
import classNames from "classnames" 
import { CategoryItemsType, MenuItems } from "@/constants/types";
import Link from "next/link";

interface MenuListProps {
  categoryList: CategoryItemsType[] | null;
}
const linkStyle = classNames(
  "flex",
  "items-center",
  "font-bold",
  "text-xl",
  "w-full",
  "mt-4"
);

const noLinkStyle = classNames(
  "flex",
  "items-center",
  "justify-center",
  "text-lg",
  "p-2",
  "w-full",
  "mt-4"
);

const menuIconStyle = classNames(
  "size-5",
  "border-none",
  "outline-none",
  "bg-transparent",
  "text-success"
);

const MenuList: FC<MenuListProps> = ({ categoryList }) => {
 
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
    <div className="pl-4">
      {MenuList.map((item) => (
        <MenuItem
          key={item.id}
          link={item.link}
          content={item.content}
          subMenuList={item.subMenuList}
        />
      ))}
    </div>
  );
};

export default MenuList;
