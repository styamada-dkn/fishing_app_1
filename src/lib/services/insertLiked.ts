"use server";

import { notFound } from "next/navigation";
import { ResponseError } from "../utils/errorHandle";
import { supabase } from "../db/supabaseClient";
import { revalidatePath, revalidateTag } from "next/cache";
import { getServSession } from "../auth";
import { QueryData } from "@supabase/supabase-js";

export interface ResultType<T> {
  likedData: T;
  message: string;
  status: number;
}
export const insertLiked = async (
  post_id: string,
  formData: FormData,
) => {

  try {

    // 認証情報取得
    const session = await getServSession();

    if (!session) {
      notFound();
    }
    const userId = session.user.id;

    const query = supabase
      .from("post_liked")
      .insert({
        "liked_user_id": Number(userId),
        "post_id": Number(post_id)
      })
      .select()

    type queryType = QueryData<typeof query>;

    const { data, error } = await query

    if (error) {
      throw new ResponseError(`DB処理エラー::::${error.message}`, 500);
    }

    if (!data) {
      throw new ResponseError("いいね登録後のデータ取得エラー", 400);
    }

    const res: ResultType<queryType> = {
      likedData: data, status: 200, message: "いいねデータINSERT-OK"
    }

    revalidatePath(`/detail/${post_id}`);
    revalidateTag(`detail/${post_id}`);

    return res;

  } catch (error) {
    if (error instanceof ResponseError) {
      console.error(error);
      return { error: { message: error.message } };
    }
  }
};