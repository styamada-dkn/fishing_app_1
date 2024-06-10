import { PageInfoType } from "@/lib/utils/paginate";
import Link from "next/link";
import { FC } from "react";
import classNames from "classnames";

interface PaginateProps {
  currentPage: number;
  pageInfo: PageInfoType;
}
const prevNextFrame = classNames(
  "text-neutral",
  "border",
  "bg-secondary",
  "rounded",
  "py-1",
  "px-2",
  "ml-1",
  "text-xs",
  "md:text-base"
);
const pageFrame = classNames(
  "border",
  "border-secondary",
  "rounded",
  "py-1",
  "px-2",
  "ml-1",
  "text-xs",
  "md:text-base"
);
const currentPageFrame = classNames(
  "text-neutral",
  "bg-success",
  "border",
  "rounded",
  "py-1",
  "px-3",
  "ml-1",
  "text-xs",
  "md:text-base"
);
function switchCss(currentPage: number, pageInfoPage: number | string) {
  if (typeof pageInfoPage !== "number") {
    return;
  }
  return currentPage === pageInfoPage ? currentPageFrame : pageFrame;
}

const Paginate: FC<PaginateProps> = ({ currentPage, pageInfo }) => {
  const pagePath = "?page=";
  const query = pageInfo.query ? `&query=${pageInfo.query}` : "";

  return (
    <nav>
      <ul className="flex flex-wrap justify-center items-center">
        {pageInfo.prev && (
          <li className={prevNextFrame}>
            <Link href={`${pagePath}${pageInfo.prev}${query}`} prefetch={false}>
              前へ
            </Link>
          </li>
        )}
        {pageInfo.items.map((item, index) => (
          <li key={index} className={switchCss(currentPage, item)}>
            {typeof item === "number" ? (
              <Link href={`${pagePath}${item}${query}`} prefetch={false}>
                {item.toString()}
              </Link>
            ) : (
              <span>{item.toString()}</span>
            )}
          </li>
        ))}
        {pageInfo.next && (
          <li className={prevNextFrame}>
            <Link href={`${pagePath}${pageInfo.next}${query}`} prefetch={false}>
              次へ
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Paginate;
