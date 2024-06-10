import ArticleForm from "@/app/components/form/ArticleForm";
import SiteContainer from "../_components/SiteContainer";
import Header from "@/app/components/header/Header";
import { getCategories } from "@/lib/services/getCategories";
import { MenuNode } from "@/constants/types";
import { getServSession } from "@/lib/auth";
import { notFound } from "next/navigation";

const NewPage = async () => {
  // 認証情報取得
  const session = await getServSession();

  if (!session) {
    notFound();
  }

  const {
    categories,
    message: categoryMessage,
    status: categoryStatus,
  } = await getCategories();

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
            {/* 入力エリア */}
            <ArticleForm categoryList={categoryList} />
          </SiteContainer>
        </div>
      </div>
    </>
  );
};

export default NewPage;
