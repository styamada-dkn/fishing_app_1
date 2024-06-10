import { FC, ReactNode } from "react";

interface HeaderContainerProps {
  children: ReactNode;
}

const HeaderContainer: FC<HeaderContainerProps> = ({ children }) => {
  return (
    <header className="bg-primary h-16 border-b-2 pl-2 md:px-12 relative">
      <div className="flex justify-between pl-0 pr-4 md:px-8 items-center h-full">
        {children}
      </div>
    </header>
  );
};

export default HeaderContainer;
