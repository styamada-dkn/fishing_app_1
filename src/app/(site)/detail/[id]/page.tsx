import React, { FC } from "react";
import DetailArticle from "../_components/DetailArticle";
import SiteContainer from "../../_components/SiteContainer";
import {
  ArticleType,
  CommentType,
  UserAccountType,
} from "@/constants/types";
import Header from "@/app/components/header/Header";
import { getPostById } from "@/lib/services/getPostById";
import { getCommentsById } from "@/lib/services/getCommentsById";
import { getPhotosById } from "@/lib/services/getPhotosById";
import { getLikedById } from "@/lib/services/getLikedById";
import { getServSession } from "@/lib/auth";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface DetailPageProps {
  params: { id: string };
}

export async function generateMetadata({
  params: { id },
}: DetailPageProps): Promise<Metadata> {
  const { post } = await getPostById(id);
  if (!post || post.length === 0) {
    notFound();
  }
  return {
    title: `${post[0].title}`,
    description: `${post[0].content.slice(0, 100)}`,
  };
}

const DetailPage: FC<DetailPageProps> = async ({ params: { id } }) => {
  // 認証情報取得
  const session = await getServSession();

  const userAccount: UserAccountType = {
    id: (session?.user.id as string) ?? "",
    name: (session?.user.name as string) ?? "",
    email: (session?.user.email as string) ?? "",
    image: (session?.user.image as string) ?? "",
  };

  const { post } = await getPostById(id);

  if (!post || post.length === 0) {
    notFound();
  }

  const { commnets } = await getCommentsById(id);

  const { photos } = await getPhotosById(id);

  const { liked } = await getLikedById(id);

  const articleDataList = !post
    ? []
    : post?.map((item) => {
        return {
          ...item,
          category_name: item.mst_category.label,
          creator_name: item.mst_accounts?.name,
          email: item.mst_accounts?.email,
        } as ArticleType;
      });
  const articleData = articleDataList[0];

  const commentsWithCommenterName = !commnets
    ? []
    : commnets.map((comment) => {
        return {
          ...comment,
          commenter_name: comment.mst_accounts?.name,
        } as CommentType;
      });

  return (
    <>
      {/* ヘッダー */}
      <Header />
      {/* メインコンテンツ */}
      <div className="flex h-[calc(100vh-4rem_-_2.75rem)]">
        <div className="bg-five flex-1 overflow-auto">
          <SiteContainer>
            <DetailArticle
              post_id={id}
              articleData={articleData}
              commentData={commentsWithCommenterName}
              likedData={liked ?? []}
              photoData={photos ?? []}
              authUser={userAccount.id ?? ""}
            />
          </SiteContainer>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
