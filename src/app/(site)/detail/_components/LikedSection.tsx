"use client";
import { LikedType } from "@/constants/types";
import { insertLiked } from "@/lib/services/insertLiked";
import classNames from "classnames";
import { FC, useEffect, useOptimistic, useState } from "react";
import { FaThumbsUp } from "react-icons/fa6";

interface LikedSectionProps {
  post_id: string;
  likedData: LikedType[];
  authUser: string;
}

const LikedSection: FC<LikedSectionProps> = ({
  post_id,
  likedData,
  authUser,
}) => {
  // いいね済みか（初期値：未）
  const [isLiked, setIsLiked] = useState(false);
  // いいねボタンを無効にする（初期値：無効）
  const [likedBtnDisabled, setLikedBtnDisabled] = useState(true);
  //いいね件数
  const [likedCount, setLikedCount] = useState<number>(likedData.length);

  const [optimisticLikedCount, AddOptimisticLikedCount] = useOptimistic(
    likedCount,
    (preLikedCount, newLikedCount: number) => {
      if (preLikedCount >= newLikedCount) return preLikedCount;
      return preLikedCount + newLikedCount;
    }
  );

  const handleSubmitAction = async (formData: FormData) => {
    try {
      const frmlikedCnt = Number(formData.get("likedCnt")) ?? 0;

      if (typeof frmlikedCnt !== "number") return;

      AddOptimisticLikedCount(1);

      const likedData = await insertLiked(post_id, formData);

      if (!likedData) return;

      setLikedCount((prev) => prev + 1);
      setIsLiked(true);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLikedBtnDisabled(true);
    }
  };

  // ログイン済みでかつ
  // いいね済みでなければ
  // いいねボタンを有効にする
  useEffect(() => {
    if (authUser) {
      const isliked = likedData.filter((liked) => {
        return Number(authUser) === liked.liked_user_id;
      });
      if (isliked.length === 0) {
        // ボタン有効
        setLikedBtnDisabled(false);
      } else {
        //いいね済みの場合はボタンを赤にする（ボタン無効のまま）
        setIsLiked(true);
      }
    }
  }, [authUser, likedData]);

  const likedBtnStyle = classNames(
    "border-none",
    "outline-none",
    "bg-transparent",
    "cursor-pointer",
    "hover:animate-pulse",
    isLiked ? "text-error animate-none" : "",
    "disabled:cursor-not-allowed",
    "disabled:animate-none"
  );

  return (
    <form action={handleSubmitAction}>
      <div className="min-h-10 bg-third rounded-lg flex p-3 items-center justify-center outline-dashed">
        <div className="flex items-center pr-2">
          <button
            type="submit"
            disabled={likedBtnDisabled}
            className={likedBtnStyle}
          >
            <FaThumbsUp className="size-6" />
          </button>
        </div>
        {/* いいね件数 */}
        <div className="pl-1 pr-2">{optimisticLikedCount}</div>
        <div className="pl-1 text-sm">
          <input type="hidden" name="likedCnt" value={likedCount} />
          {optimisticLikedCount > 0 ? "いいね!" : "いいね下さい！"}
        </div>
      </div>
    </form>
  );
};
export default LikedSection;
