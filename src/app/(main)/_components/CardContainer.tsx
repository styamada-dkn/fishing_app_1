import CardItem from "./CardItem";
import Link from "next/link";
import { ContentsPath, PostType } from "@/constants/types";
import { FC } from "react";
import Image from "next/image";
import classNames from "classnames" 

interface CardContainerProps {
  post: PostType | null;
}

const CardContainer: FC<CardContainerProps> = ({ post }) => {
  const cardContainerStyle = classNames(
    "w-64",
    "max-w-64",
    "h-auto",
    "max-h-96",
    "mt-2",
    "bg-neutral",
    "rounded-md",
    "shadow-md",
    "hover:opacity-90",
    "cursor-pointer"
  );
    
  let photo1_path = "/no_image.jpg";
  if (post?.post_photos) {
    if (post?.post_photos?.length > 0) {
      post?.post_photos.forEach((photo) => {
        if (photo.photo_area === "photo1") {
          photo1_path = photo.image_url ?? "/no_image.jpg";
        }
      });
    }
  }

  return (
    <div className={cardContainerStyle}>
      <Link prefetch={false} href={`${ContentsPath.DETAIL}/${post?.id}`}>
        <div className="pb-2">
          {/*投稿写真*/}
          {/* <div className="w-full h-auto relative"> */}
          <div className="h-[244px] relative">
            <Image
              src={photo1_path}
              alt="image"
              fill
              // width={264}
              // height={264}
              className="object-cover"
            />
            <p className="absolute top-0 left-0 text-sm z-10 text-info border border-info">
              {/* ジャンル */}
              {post?.mst_category?.label ?? ""}
            </p>
          </div>
          {/* 天気・釣果・タイトル・記事本文 */}
          <CardItem post={post} />
        </div>
      </Link>
    </div>
  );
};

export default CardContainer;
