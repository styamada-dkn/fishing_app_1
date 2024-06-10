"use client";
import { CommentType } from "@/constants/types";
import { FC } from "react";
import { FaFilePen, FaPen, FaRegCommentDots } from "react-icons/fa6";
import CommentModalContainer from "./CommentModalContainer";
import { formateDateTime } from "@/lib/utils/util";

interface CommentSectionProps {
  post_id: string;
  comments: CommentType[];
  authUser: string;
}

const CommentSection: FC<CommentSectionProps> = ({
  post_id,
  comments,
  authUser,
}) => {
  return (
    <>
      <div className="w-full min-h-80 bg-third rounded-lg">
        <div className="bg-form text-neutral rounded-t-lg">
          <div className="relative text-center align-middle">
            <div className="flext justify-center items-center leading-8">
              <FaRegCommentDots className="size-5 inline" />
              <h3 className="font-bold pl-2 pr-3 inline ">みんなのコメント</h3>
            </div>
            {/* ログイン中のみ「コメントする」ボタンを表示 */}
            {authUser && (
              <CommentModalContainer post_id={post_id} authUser={authUser}>
                <div className="text-sm flex items-center px-6 ring-1 ring-third rounded shadow-lg bg-warning leading-8  hover:animate-pulse">
                  <FaFilePen className="size-4" />
                  <span className="pl-2 opacity-90">コメントする</span>
                </div>
              </CommentModalContainer>
            )}
          </div>
        </div>
        {comments.length > 0 ? (
          <ul className="">
            {comments.map((comment, key) => (
              <li key={comment.id} className="break-all p-4">
                <div className="border-b border-dashed py-2">
                  <div className="flex gap-1 justify-between">
                    <div className="text-md   text-secondary">
                      <span className="pr-2">{key + 1}</span>
                      <span className="text-sm   text-fourth">
                        {comment.commenter_name}
                      </span>
                    </div>
                    <span className="text-xs">
                      {formateDateTime(comment.updated_at)}
                    </span>
                  </div>
                  {/* コメント欄 */}
                  <div className="mt-2 text-base leading-snug">
                    {comment.comment}
                  </div>
                  {/* ログインユーザでかつ自分のコメントのみ編集ボタンを表示させる */}
                  {String(comment.commenter_id) === String(authUser) && (
                    <div className="flex justify-end items-center">
                      <CommentModalContainer
                        key={comment.id}
                        post_id={post_id}
                        comment_id={comment.id}
                        comment={comment.comment}
                        authUser={authUser}
                      >
                        <div className="flex items-center  text-warning">
                          <FaPen className="size-2 md:size-3 inline" />
                          <div className="pl-1 text-sm">編集する</div>
                        </div>
                      </CommentModalContainer>
                    </div>
                  )}
                </div>
                <div></div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">コメントがありません</p>
        )}
      </div>
    </>
  );
};

export default CommentSection;
