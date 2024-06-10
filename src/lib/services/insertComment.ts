"use server";

import { notFound } from "next/navigation";
import { ResponseError } from "../utils/errorHandle";
import { supabase } from "../db/supabaseClient";
import { revalidatePath, revalidateTag } from "next/cache";
import { getServSession } from "../auth";

export const insertComment = async (
  post_id: string,
  formData: FormData
) => {

  try {

    // 認証情報取得
    const session = await getServSession();

    if (!session) {
      notFound();
    }
    const userId = session.user.id;
    const comm = formData.get("commentdata");

    let query;

    // eslint-disable-next-line prefer-const
    query = supabase
      .from("post_comments")
      .insert({
        "comment": String(comm),
        "commenter_id": Number(userId),
        "post_id": Number(post_id)
      })
      .select()

    const { data: queryData, error: queryError } = await query

    if (queryError) {
      throw new ResponseError(`DB処理エラー::::${queryError.message}`, 500);
    }

    if (!queryData) {
      throw new ResponseError("コメント登録後のデータ取得エラー", 400);
    }

    revalidatePath(`/detail/${post_id}`);
    revalidateTag(`detail/${post_id}`);

    return;

  } catch (error) {
    if (error instanceof ResponseError) {
      console.error(error);
      return { error: { message: error.message } };
    }

  }

};