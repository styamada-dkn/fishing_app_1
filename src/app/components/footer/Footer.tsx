import classNames from "classnames";

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
      <small className="pl-4 underline">プライバシーポリシー</small>
    </div>
  );
};

export default Footer;
