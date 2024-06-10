import { FC, ReactNode } from "react";
import { FaColumns } from "react-icons/fa";

interface CategoryLabelProps {
  children: ReactNode;
}
const CategoryLabel: FC<CategoryLabelProps> = ({ children }) => {
  return (
    <div className="w-full min-h-20 rounded-lg bg-third shadow-md text-center">
      <div className="bg-warning rounded-t-lg text-center flex justify-center items-center">
        <FaColumns className="size-5 pr-2" />
        <h3 className="font-bold">ジャンル</h3>
      </div>
      <div className="pt-4">
        <label>{children}</label>
      </div>
    </div>
  );
};

export default CategoryLabel;
