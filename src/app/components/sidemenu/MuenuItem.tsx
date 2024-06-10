"use client";
import { useSearchParams } from "next/navigation";
import { FC, ReactNode } from "react";
import SubMenuItem from "./SubMenuItem";
import { CategoryItemsType } from "@/constants/types";
import classNames from "classnames";

interface MenuItemProps {
  link: string;
  content: ReactNode;
  subMenuList: CategoryItemsType[] | null;
}

const MenuItem: FC<MenuItemProps> = ({ link, content, subMenuList }) => {
  const searchParams = useSearchParams();
  const param = new URLSearchParams(link);

  const hitStyle = classNames(
    searchParams.get("query") === param.get("query")
      ? "bg-secondary shadow-md text-neutral border-r-4 border-r-accent"
      : "hover:text-success hover:bg-neutral"
  );

  return (
    <>
      <div className={link && hitStyle}>{content}</div>
      <ul>
        {subMenuList?.map((item) => (
          <li key={item.id}>
            <SubMenuItem
              label={item.label}
              link={item.link}
              node_type={item.node_type}
            />
          </li>
        ))}
      </ul>
    </>
  );
};
export default MenuItem;
