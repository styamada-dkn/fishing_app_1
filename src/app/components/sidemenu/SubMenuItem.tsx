import { MenuNode } from "@/constants/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FC } from "react";
import { FaRegBookmark, FaRegFlag } from "react-icons/fa6";
import classNames from "classnames";

interface SubMenuItemProps {
  label: string;
  node_type: MenuNode;
  link: string;
}

const SubMenuItem: FC<SubMenuItemProps> = ({ label, link, node_type }) => {
  const searchParams = useSearchParams();
  const param = new URLSearchParams(link);

  const subMenuParentIconStyle = classNames(
    "size-5",
    "border-none",
    "outline-none",
    "bg-transparent",
    "bg-primary",
    "text-info"
  );

  const subMenuChildIconStyle = classNames(
    "size-5",
    "border-none",
    "outline-none",
    "bg-transparent",
    "text-warning"
  );

  const linkStyle = classNames(
    "flex",
    "items-center",
    "font-normal",
    "w-full",
    "mt-4",
    searchParams.get("query") === param.get("query")
      ? "bg-slate-600 text-neutral shadow-md border-r-4 border-r-amber-300"
      : "hover:text-success hover:bg-neutral"
  );

  return (
    <Link href={link} className={linkStyle}>
      <div className="pr-4  pl-2 ">
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
  );
};
export default SubMenuItem;
