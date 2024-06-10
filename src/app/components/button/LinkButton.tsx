import Link from "next/link";
import { ReactNode } from "react";
import classNames from "classnames" 

interface Props extends React.ComponentPropsWithoutRef<typeof Link> {
  size?: "xsmall" | "small" | "medium" | "large";
  href: string;
  children: ReactNode;
}

export const LinkButton = ({
  size = "medium",
  href,
  className,
  children,
  ...props
}: Props) => {
  let btnSize = [];
  switch (size) {
    case "xsmall":
      btnSize = ["px-0", "py-0", "text-xs"];
      break;
    case "small":
      btnSize = ["px-1", "py-2", "text-sm"];
      break;
    case "medium":
      btnSize = ["px-1 md:px-3", "py-3 md:py-4", "text-xs md:text-base"];
      break;
    case "large":
      btnSize = ["px-4", "py-5", "text-lg"];
      break;
    default:
      btnSize = ["px-3", "py-4", "text-base"];
  }

  const defaulButtonStyle = classNames(
    "rounded-md",
    "bg-accent",
    "text-secondary",
    "shadow-md",
    "border-none",
    "outline-none",
    "cursor-pointer",
    "hover:opacity-90"
  );

  return (
    <Link
      {...props}
      href={href}
      className={`${defaulButtonStyle} ${className} ${classNames(btnSize)}`}
    >
      {children}
    </Link>
  );
};
