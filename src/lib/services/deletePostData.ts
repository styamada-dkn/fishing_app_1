"use server";

import { notFound, redirect } from "next/navigation";
import { z } from "zod";
import { ResponseError } from "../utils/errorHandle";
import { supabase } from "../db/supabaseClient";
import { revalidatePath, revalidateTag } from "next/cache";
import { deletePhotoWithId } from "./deletePhotoWithId";
import { getServSession } from "../auth";
import { FormStateType } from "@/app/components/form/state";

export const deletePostData = async (
  post_id: string,
  prevState: FormStateType | null,
  formData: FormData
): Promise<FormStateType> => {
  try {

    // 認証情報取得
    const session = await getServSession();

    if (!session) {
      notFound();
    }

    const { data: deleteData, error: queryError } = await supabase
      .from("posts")
      .delete()
      .eq("id", Number(post_id))
      .select();

    if (queryError) {
      throw new ResponseError(`DB処理エラー::::${queryError.message}`, 500);
    }

    if (!deleteData) {
      throw new ResponseError("削除対象データがありません", 400);
    }

    //画像ファイル削除
    const response = await deletePhotoWithId(post_id);

    revalidatePath(`/edit/${post_id}`);
    revalidatePath(`/detail/${post_id}`);
    revalidateTag(`delete/${post_id}`);

    await new Promise(resolve => setTimeout(resolve, 2000))

  } catch (error) {
    if (error instanceof ResponseError) {
      console.error(error);
      return { ...prevState, error: { message: error.message, status: 400 } };
    }

    if (error instanceof z.ZodError) {
      return { ...prevState, fieldErrors: error.formErrors.fieldErrors };
    }
  }

  redirect("/");
};
