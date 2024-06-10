"use server";

import { supabase } from "../db/supabaseClient";
import { ResponseError } from "../utils/errorHandle";
import { QueryData } from "@supabase/supabase-js";

export interface ResultType {
  isCreator: boolean | null;
  message: string;
  status: number;
}

export const isPostCreator = async (post_id: string, creator_id: string): Promise<ResultType> => {
  try {
    const query = supabase
      .from("posts")
      .select(" creator_id ")
      .match({ "id": post_id, "creator_id": creator_id })

    type queryType = QueryData<typeof query>

    const { data, error } = await query

    if (error) {
      throw new ResponseError(`DB処理エラー::::${error.message}:::${error.hint}`, 500);
    }

    const resultData: queryType = data;

    if (resultData.length === 0) {
      return { isCreator: false, message: "（投稿者）ではありません", status: 200 };
    }

    const res = {
      isCreator: true, message: "（投稿者）です", status: 200
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
