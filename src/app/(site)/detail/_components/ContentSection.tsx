import { FC } from "react";
import { FaFeatherPointed } from "react-icons/fa6";

interface ContentSectionProps {
  content: string;
}
const ContentSection: FC<ContentSectionProps> = ({ content }) => {
  return (
    <div className="min-h-40  bg-third rounded-lg">
       <div className="bg-form text-neutral rounded-t-lg flex justify-center items-center">
          <FaFeatherPointed className="size-5" />
          <h3 className="font-bold pl-2 leading-8">釣行記事</h3>
        </div>
      <div className="p-2 break-all leading-snug">{content}</div>
    </div>
  );
};

export default ContentSection;
