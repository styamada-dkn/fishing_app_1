"use server";

import { supabase } from "../db/supabaseClient";
import { ResponseError } from "../utils/errorHandle";
import { QueryData } from "@supabase/supabase-js";

export interface ResultType<T> {
  photos: T;
  message: string;
  status: number;
}

export const getPhotosById = async (id: string) => {
  try {
    const query = supabase
      .from("post_photos")
      .select()
      .eq("post_id", id)
      .order("photo_area", { ascending: true })

    type queryType = QueryData<typeof query>

    const { data, error } = await query

    if (error) {
      throw new ResponseError("DB処理エラー::::", 500);
    }

    const resultData: queryType = data;

    if (!data) {
      return { photos: null, message: "写真データがありません", status: 400 };
    }

    const res: ResultType<queryType> = {
      photos: resultData, status: 200, message: "データ取得OK"
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
