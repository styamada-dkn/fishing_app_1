import { PostType } from "@/constants/types";
import React, { FC } from "react";
import { FaThumbsUp } from "react-icons/fa6";

interface CardItemProps {
  post: PostType | null;
}
const CardItem: FC<CardItemProps> = ({ post }) => {
  return (
   <div>
      <ul className="text-xs mt-1 p-1">
        <li className="flex justify-between pr-2">
          {/* 投稿者 */}
          <p className="flex">
            <span className="font-semibold">投稿者:</span>
            <span className="line-clamp-3 text-success">{post?.mst_accounts?.name}</span>
          </p>
          {/*いいね */}
          <div className="flex text-warning">
            <FaThumbsUp className="size-4" />
            <span className="pl-2 font-bold">
              {typeof post?.post_liked[0].count === "number"
                ? String(post?.post_liked[0].count)
                : "0"}
            </span>
          </div>
        </li>
        <li className="mt-1 pr-2 border-b">
          <div className="flex justify-between">
            {/* 釣行日 */}
            <p className="">{post?.fish_day}</p>
            {/* 釣果 */}
            <p>{post?.fish_result}</p>
          </div>
        </li>
        <li className="mt-1 pr-2">
          {/* タイトル */}
          <p className="line-clamp-1">{post?.title}</p>
          {/* 記事本文 */}
          <p className="line-clamp-2">{post?.content}</p>
        </li>
      </ul>
    </div>
  );
};

export default CardItem;
