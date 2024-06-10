import classNames from "classnames" 
import MenuList from "./MenuList";
import PhotoImage from "../photo/PhotoImage";
import Link from "next/link";
import { getCategories } from "@/lib/services/getCategories";

export const revalidate = 60 * 60;

const SideMenu = async () => {
  //カテゴリーマスタを取得
  const { categories: categoryList } = await getCategories();

  const sideMenuStyle = classNames(
    //"bg-primary",
    "bg-third",
    ["w-56", "pt-4", "pl-4"],
    "text-secondary",
    ["border-r-2", "border-r-neutral"],
    ["hidden", "md:block"]
  );

  return (
    <div className={sideMenuStyle}>
      <div>
        <Link href="/">
          <h1 className="text-xl font-bold">
            <PhotoImage imageUrl="/fishing_title.jpg" size="large" />
          </h1>
        </Link>
      </div>
      <MenuList categoryList={categoryList} />
    </div>
  );
};

export default SideMenu;
