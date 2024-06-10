import MainContainer from "./_components/MainContainer";
import CardCollection from "./_components/CardCollection";
import SideMenu from "../components/sidemenu/SideMenu";
import Header from "../components/header/Header";
import { getPosts } from "@/lib/services/getPosts";
import Paginate from "../components/paginate/Paginate";
import { isValidPageNumber } from "@/lib/utils/util";

const MainPage = async ({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) => {
  const query = searchParams?.query || "";
  const page = isValidPageNumber(searchParams?.page) ? searchParams?.page : "1";
  // １ページの表示件数
  const perPage = "12";

  const { posts, pageInfo } = await getPosts({ page, perPage, query });

  return (
    <>
      {/* ヘッダー */}
      <Header />
      <div className="flex h-[calc(100vh-4rem_-_2.75rem)]">
        {/* サイドメニュー */}
        <SideMenu />
        {/* メインコンテンツ */}
        <div className="flex-1 overflow-auto bg-primary">
          <MainContainer>
            {posts?.length === 0 ? (
              <p className="text-2xl font-bold text-warning">
                お探しのジャンルにはまだ投稿がありません
              </p>
            ) : (
              <CardCollection posts={posts} />
            )}
          </MainContainer>
          {/* ページネーション */}
          <div className="mt-10 flex items-center justify-center">
            {posts?.length > 0 && (
              <Paginate currentPage={Number(page)} pageInfo={pageInfo} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
