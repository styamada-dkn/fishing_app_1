import SiteContainer from "../../_components/SiteContainer";
import { FC } from "react";
import Header from "@/app/components/header/Header";
import { getPostById } from "@/lib/services/getPostById";
import { getPhotosById } from "@/lib/services/getPhotosById";
import { getCategories } from "@/lib/services/getCategories";
import { ArticleType, MenuNode, UserAccountType } from "@/constants/types";
import ArticleForm from "@/app/components/form/ArticleForm";
import { getServSession } from "@/lib/auth";
import { notFound } from "next/navigation";
import { isPostCreator } from "@/lib/services/isPostCreator";

interface EditPageProps {
  params: { id: string };
}

const EditPage: FC<EditPageProps> = async ({ params: { id } }) => {
  // 認証情報取得
  const session = await getServSession();

  if (!session) {
    notFound();
  }
  const userAccount: UserAccountType = {
    id: (session?.user.id as string) ?? "",
    name: (session?.user.name as string) ?? "",
    email: (session?.user.email as string) ?? "",
    image: (session?.user.image as string) ?? "",
  };

  const { post } = await getPostById(id);

  if (!post) {
    notFound();
  }
  // ログインユーザーと記事投稿者が合っているかチェック
  if (userAccount.id) {
    if (id) {
      const creator = await isPostCreator(id, userAccount.id);
      if (!creator.isCreator) {
        notFound();
      }
    }
  }

  const { photos } = await getPhotosById(id);

  const { categories } = await getCategories();

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

  const categoryList = categories?.filter((item) => {
    return item.node_type === Number(MenuNode.CHILDREN);
  });

  return (
    <>
      {/* ヘッダー */}
      <Header />
      {/* メインコンテンツ */}
      <div className="flex h-[calc(100vh-4rem_-_2.75rem)]">
        <div className="bg-five flex-1 overflow-auto">
          <SiteContainer>
            <ArticleForm
              post_id={id}
              articleData={articleData}
              photoData={photos ?? []}
              categoryList={categoryList}
            />
          </SiteContainer>
        </div>
      </div>
    </>
  );
};

export default EditPage;
