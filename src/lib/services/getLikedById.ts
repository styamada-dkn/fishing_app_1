"use server";

import { supabase } from "../db/supabaseClient";
import { ResponseError } from "../utils/errorHandle";
import { QueryData } from "@supabase/supabase-js";

export interface ResultType<T> {
  liked: T;
  message: string;
  status: number;
}

export const getLikedById = async (id: string) => {
  try {
    const query = supabase
      .from("post_liked")
      .select()
      .eq("post_id", id)

    type queryType = QueryData<typeof query>

    const { data, error } = await query

    if (error) {
      throw new ResponseError("DB処理エラー::::", 500);
    }

    const resultData: queryType = data;

    if (!data) {
      return { liked: null, message: "いいねデータがありません", status: 400 };
    }

    const res: ResultType<queryType> = {
      liked: resultData, status: 200, message: "データ取得OK"
    }

    return res;

  } catch (error) {
    console.error("Error:::", error);
    if (error instanceof ResponseError) {
      console.error("DB-Error:::", error);
    }
    throw error;
  }
};
