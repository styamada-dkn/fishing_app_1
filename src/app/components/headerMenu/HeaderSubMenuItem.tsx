import { MenuNode } from "@/constants/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FC } from "react";
import { FaRegBookmark, FaRegFlag } from "react-icons/fa6";
import classNames from "classnames";

interface HeaderSubMenuItemProps {
  label: string;
  node_type: MenuNode;
  link: string;
  onChangeState: () => void;
}

const HeaderSubMenuItem: FC<HeaderSubMenuItemProps> = ({
  label,
  link,
  node_type,
  onChangeState,
}) => {
  const searchParams = useSearchParams();
  const param = new URLSearchParams(link);

  const subMenuParentIconStyle = classNames(
    "size-3",
    "border-none",
    "outline-none",
    "bg-primary",
    "text-info"
  );

  const subMenuChildIconStyle = classNames(
    "size-3",
    "border-none",
    "outline-none",
    "text-warning"
  );

  const linkStyle = classNames(
    "flex",
    "items-center",
    "font-normal",
    "text-base",
    "w-full",
    "mt-2",
    searchParams.get("query") === param.get("query")
      ? "bg-slate-600 shadow-md text-neutral border-r-2 border-r-amber-300"
      : ""
  );

  return (
    <button onClick={onChangeState} className="w-full">
      <Link href={link} className={linkStyle}>
        <div className="pl-2">
          {node_type === MenuNode.PARENT ? (
            <FaRegFlag className={subMenuParentIconStyle} />
          ) : (
            <FaRegBookmark className={subMenuChildIconStyle} />
          )}
        </div>
        <div>
          <p
            className={`${
              node_type === MenuNode.PARENT ? "font-bold" : "font-normal"
            }`}
          >
            {label}
          </p>
        </div>
      </Link>
    </button>
  );
};
export default HeaderSubMenuItem;
