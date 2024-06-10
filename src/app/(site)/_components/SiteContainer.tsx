import React, { FC, ReactNode } from "react";
import classNames from "classnames" 

interface SiteContainerProps {
  children: ReactNode;
}
const SiteContainer: FC<SiteContainerProps> = ({ children }) => {
  const topContainerStyle = classNames([
    "m-auto",
    "max-w-7xl",
    "w-full",
    "p-4",
    "md:px-10 py-3",
  ]);

  return (
    <div className={topContainerStyle}>
      <div>{children}</div>
    </div>
  );
};

export default SiteContainer;
