"use client";
import { CategoryItemsType } from "@/constants/types";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";
import HeaderMenuList from "./HeaderMenuList";
import { getCategories } from "@/lib/services/getCategories";

const HeaderMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categoryItems, setCategoryItems] = useState<
    CategoryItemsType[] | null
  >(null);

  const changeState = () => {
    setIsOpen((prev) => !prev);
  };

  //カテゴリーマスタを取得
  useEffect(() => {
    const getData = async () => {
      const { categories: categoryList } = await getCategories();
      setCategoryItems(categoryList);
    };
    void getData();
  }, []);

  return (
    <>
      <div className="md:hidden h-full">
        <button onClick={() => changeState()}>
          <FaBars
            className={`size-8 text-neutral duration-300 ease-linear animate-none ${
              isOpen ? "rotate-90 animate-pulse" : "rotate-0"
            }`}
          />
        </button>
        {isOpen && (
          <HeaderMenuList
            categoryList={categoryItems}
            onChangeState={changeState}
          />
        )}
      </div>
    </>
  );
};

export default HeaderMenu;
