"use server";

import { supabase } from "../db/supabaseClient";
import { ResponseError } from "../utils/errorHandle";
import { QueryData } from "@supabase/supabase-js";

export interface ResultType<T> {
  post: T;
  message: string;
  status: number;
}

export const getPostById = async (id: string) => {
  try {
    const query = supabase
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
        )
      `
      )
      .eq("id", id)

    type queryType = QueryData<typeof query>

    const { data, error } = await query

    if (error) {
      throw new ResponseError("DB処理エラー::::", 500);
    }

    const resultData: queryType = data;

    if (!data) {
      return { post: null, message: "記事データがありません", status: 400 };
    }

    const res: ResultType<queryType> = {
      post: resultData, status: 200, message: "データ取得OK"
    }

    return res;

  } catch (error) {
    console.error("Error:::", error);
    if (error instanceof ResponseError) {
      console.error("DB-Error:::", error);
    }
    return { post: null, message: "サーバーエラー", status: 400 };
  }
};
