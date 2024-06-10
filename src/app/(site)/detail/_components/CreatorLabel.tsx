import { FC, ReactNode } from "react";
import { FaHandPeace } from "react-icons/fa6";

interface CreatorLabelProps {
  children: ReactNode;
}
const CreatorLabel: FC<CreatorLabelProps> = ({ children }) => {
  return (
    <div className="w-full min-h-20 rounded-lg bg-third shadow-md text-center">
      <div className="bg-warning rounded-t-lg text-center flex justify-center items-center">
        <FaHandPeace className="size-6 pr-2" />
        <h3 className="font-bold">投稿者</h3>
      </div>
      <div className="pt-4">
        <label>{children}</label>
      </div>
    </div>
  );
};

export default CreatorLabel;
