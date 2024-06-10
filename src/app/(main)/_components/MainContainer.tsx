import React, { FC, ReactNode } from "react";
import classNames from "classnames" 

interface MainContainerProps {
  children: ReactNode;
}
const MainContainer: FC<MainContainerProps> = ({ children }) => {
  const topContainerStyle = classNames(["m-auto", "p-2"]);
  const flexContainerStyle = classNames(
    ["flex", "flex-col", "items-center"],
    ["md:flex-row", "md:flex-wrap","md:items-start"],
    ["gap-4"]
  );
  return (
    <div className={topContainerStyle}>
      <div className={flexContainerStyle}>{children}</div>
    </div>
  );
};

export default MainContainer;
