import React, { FC } from "react";
import InfoSection from "./InfoSection";
import {
  ArticleType,
  CommentType,
  LikedType,
  PhotoType,
} from "@/constants/types";
import ContentSection from "./ContentSection";
import CommentSection from "./CommentSection";
import LikedSection from "./LikedSection";
import PhotoArea from "./PhotoArea";
import CategoryLabel from "./CategoryLabel";
import CreatorLabel from "./CreatorLabel";

interface DetailArticleProps {
  post_id: string;
  articleData: ArticleType;
  commentData: CommentType[];
  likedData: LikedType[];
  photoData: PhotoType[];
  authUser: string;
}

const DetailArticle: FC<DetailArticleProps> = ({
  post_id,
  articleData,
  commentData,
  likedData,
  photoData,
  authUser,
}) => {
  return (
    <>
      <section className="shadow-md">
        {/* タイトル */}
        <div className="rounded-lg bg-third pl-3 outline">
          <h2 className="text-base leading-10 pl-2 h-full  md:text-xl md:leading-10 text-secondary md:font-medium line-clamp-1">
            {articleData.title}
          </h2>
        </div>
      </section>
      <div className="flex flex-col md:flex-row mt-2 gap-3 justify-center">
        <div className="md:w-3/4 pt-2 order-2 md:order-1">
          <section className="shadow-md">
            {/* 写真 */}
            <PhotoArea photoData={photoData} />
          </section>
          <section className="mt-3 shadow-md">
            {/* 記事本文 */}
            <ContentSection content={articleData.content} />
          </section>
          <section className="mt-3 shadow-md">
            {/* コメント欄 */}
            <CommentSection
              post_id={post_id}
              comments={commentData}
              authUser={authUser}
            />
          </section>
        </div>
        <div className="flex-1 pt-2 order-1 md:order-2">
          {/* いいね ボタン */}
          <section className="shadow-md">
            <LikedSection post_id={post_id} likedData={likedData} authUser={authUser} />
          </section>
          <section className="mt-3">
            {/* 釣行日・釣果・天気・場所 */}
            <InfoSection
              fishday={articleData.fish_day}
              fish_result={articleData.fish_result}
              weather={articleData.weather}
              temperature={articleData.temperature}
              water_temperature={articleData.water_temperature}
              location={articleData.location}
            />
          </section>
          {/* カテゴリー */}
          <section className="mt-3 shadow-md">
            <CategoryLabel>{articleData.category_name}</CategoryLabel>
          </section>
          {/* 投稿者 */}
          <section className="mt-3 shadow-md">
            <CreatorLabel>{articleData.creator_name}</CreatorLabel>
          </section>
        </div>
      </div>
    </>
  );
};

export default DetailArticle;
