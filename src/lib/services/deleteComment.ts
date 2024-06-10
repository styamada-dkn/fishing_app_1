"use server";

import { z } from "zod";
import { ResponseError } from "../utils/errorHandle";
import { supabase } from "../db/supabaseClient";
import { revalidatePath, revalidateTag } from "next/cache";
import { getServSession } from "../auth";
import { notFound } from "next/navigation";

export const deleteComment = async (
  post_id: string,
  comment_id: number,
) => {
  try {

    // 認証情報取得
    const session = await getServSession();

    if (!session) {
      notFound();
    }

    const { data: deleteData, error: queryError } = await supabase
      .from("post_comments")
      .delete()
      .eq("id", comment_id)
      .select();

    if (queryError) {
      throw new ResponseError(`DB処理エラー::::${queryError.message}`, 500);
    }

    if (!deleteData) {
      return {
        returnData: null,
        message: "削除データがありません",
        status: 400,
      };
    }

    revalidatePath(`/detail/${post_id}`);
    revalidateTag(`detail/${post_id}`);

    return;

  } catch (error) {
    if (error instanceof ResponseError) {
      console.error(error);
      return { error: { message: error.message } };
    }

    if (error instanceof z.ZodError) {
      return { fieldErrors: error.formErrors.fieldErrors };
    }
  }

};
