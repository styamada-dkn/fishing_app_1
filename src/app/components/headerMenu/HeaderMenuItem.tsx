import { useSearchParams } from "next/navigation";
import { FC, ReactNode } from "react";
import classNames from "classnames";
import { CategoryItemsType } from "@/constants/types";
import HeaderSubMenuItem from "./HeaderSubMenuItem";

interface HeaderMenuItemProps {
  link: string;
  content: ReactNode;
  subMenuList: CategoryItemsType[] | null;
  onChangeState: () => void;
}

const HeaderMenuItem: FC<HeaderMenuItemProps> = ({
  link,
  content,
  subMenuList,
  onChangeState,
}) => {
  const searchParams = useSearchParams();
  const param = new URLSearchParams(link);

  const hitStyle = classNames(
    searchParams.get("query") === param.get("query")
      ? "bg-secondary shadow-md text-neutral border-r-4 border-r-accent"
      : ""
  );

  return (
    <>
      {link ? (
        <button onClick={onChangeState}>
          <div className={hitStyle}>{content}</div>
        </button>
      ) : (
        <div>{content}</div>
      )}
      <ul>
        {subMenuList?.map((item) => (
          <li key={item.id}>
            <HeaderSubMenuItem
              label={item.label}
              link={item.link}
              node_type={item.node_type}
              onChangeState={onChangeState}
            />
          </li>
        ))}
      </ul>
    </>
  );
};
export default HeaderMenuItem;
