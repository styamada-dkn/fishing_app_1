import { supabase } from "@/lib/db/supabaseClient";
import { ResponseError } from "@/lib/utils/errorHandle";
import { paginate } from "@/lib/utils/paginate";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") || "1");
  const perPage = Number(searchParams.get("perPage") || "10");
  const query = searchParams.get("query") || "";

  const startOffset = (page - 1) * perPage;
  const endOffset = startOffset + perPage - 1;

  let keyWord = "";
  if (query) {
    if (query.includes("-") && query.split("-").at(1) === "all") {
      keyWord = `${query.split("-").at(0)}%`;
    } else {
      keyWord = `${query}`;
    }
  }

  function switchSql(startOffset: number, endOffset: number, keyWord: string) {
    if (!keyWord) {
      return [
        supabase
          .from("posts")
          .select(
            `
               *,
                mst_category!inner(
                  label
                ),
                mst_accounts(
                  email,
                  name
                ),
                post_liked (
                  count
                ),
                post_photos (
                  image_url,
                  photo_area
                )
              `
          )
          .range(startOffset, endOffset)
          .order("updated_at", { ascending: false }),

        supabase.from("posts").select(`
        count
        `),
      ];
    } else {
      return [
        supabase
          .from("posts")
          .select(
            `
             *,
              mst_category(
                label
              ),
              mst_accounts(
                email,
                name
              ),
              post_liked (
                count
              ),
              post_photos (
                image_url,
                photo_area
              )
            `
          )
          .like("category_id", keyWord)
          .range(startOffset, endOffset)
          .order("updated_at", { ascending: false }),

        supabase
          .from("posts")
          .select(
            `
          count
      `
          )
          .like("category_id", keyWord),
      ];
    }
  }
  type supabaseRetunType = ReturnType<typeof switchSql>;

  try {
    const [postsResult, countResult] = await Promise.all<supabaseRetunType>(
      switchSql(startOffset, endOffset, keyWord)
    );

    const { data: posts, error: postsError } = postsResult;
    const { data: hitCount, error: countError } = countResult;

    if (postsError || countError) {
      throw new ResponseError("DB処理エラー::::", 500);
    }

    let totalCount: number;
    if (hitCount && "count" in hitCount[0]) {
      totalCount = hitCount[0].count;
    } else {
      totalCount = 0;
    }

    // ページネーション情報作成
    const totalPage = Math.ceil(totalCount / perPage);
    const paginateResult = paginate(page, totalPage);
    const pageInfo = { ...paginateResult, query };

    return Response.json({ posts, pageInfo }, { status: 200 });

  } catch (error) {
    console.error("Error:::", error);
    if (error instanceof ResponseError) {
      console.error("DB-Error:::", error);
    }
    throw error;
  }
};

