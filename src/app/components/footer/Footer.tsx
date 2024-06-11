import classNames from "classnames";
import Link from "next/link";

const Footer = () => {
  const footerStyle = classNames(
    "bg-primary",
    "flex",
    "justify-center",
    "items-center",
    "border-t-2",
    "h-11",
    "text-xs md:text-base"
  );

  return (
    <div className={footerStyle}>
      <small className="text-info">
        &copy;2024 NARANOKI. All Rights Reserved
      </small>
      <Link href="/siteinfo" className="cursor-pointer hover:opacity-90">
        <small className="pl-1 md:pl-4 underline">このサイトについて</small>
      </Link>
      <Link href="/privacy-policy" className="cursor-pointer hover:opacity-90">
        <small className="pl-1 md:pl-4 underline">プライバシーポリシー</small>
      </Link>
    </div>
  );
};

export default Footer;
