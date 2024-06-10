"use server";

import { postDataSchema } from "@/constants/validationSchema";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";
import { ResponseError } from "../utils/errorHandle";
import { supabase } from "../db/supabaseClient";
import { revalidatePath, revalidateTag } from "next/cache";
import { deletePhotoData } from "./deletePhotoData";
import { insertPhotoData } from "./insertPhotoData";
import { getServSession } from "../auth";
import { FormStateType } from "@/app/components/form/state";

const photoGroup = ["photo1", "photo2", "photo3"] as const;
export type PhotoAreaType = typeof photoGroup[number];

const actionGroup = ["INSERT", "DELETE", "NONE"] as const;
export type PhotoActionType = typeof actionGroup[number];

export type FileListType = {
  name?: string | null;
  imgUrl?: Blob | string;
  tag: PhotoActionType;
}

export const insertOrUpdatePostData = async (
  postId: string,
  prevState: FormStateType | null,
  formData: FormData
): Promise<FormStateType> => {

  try {

    // 認証情報取得
    const session = await getServSession();

    if (!session) {
      notFound();
    }
    const userId = session.user.id;

    const fileMap: Map<PhotoAreaType, FileListType> = new Map([
      ["photo1", { name: "", imgUrl: "", tag: "NONE" }],
      ["photo2", { name: "", imgUrl: "", tag: "NONE" }],
      ["photo3", { name: "", imgUrl: "", tag: "NONE" }],
    ]);

    if (formData.get("photoImg1") !== "") {
      if ((formData.get("photo1") as File).size > 0) {
        fileMap.set("photo1", {
          name: (formData.get("photo1") as File).name,
          imgUrl: formData.get("photo1") ?? "",
          tag: "INSERT",
        })
      }
    } else {
      fileMap.set("photo1", {
        tag: "DELETE"
      })
    }
    if (formData.get("photoImg2") !== "") {
      if ((formData.get("photo2") as File).size > 0) {
        fileMap.set("photo2", {
          name: (formData.get("photo2") as File).name,
          imgUrl: formData.get("photo2") ?? "",
          tag: "INSERT",
        })
      }
    } else {
      fileMap.set("photo2", {
        tag: "DELETE"
      })
    }
    if (formData.get("photoImg3") !== "") {
      if ((formData.get("photo3") as File).size > 0) {
        fileMap.set("photo3", {
          name: (formData.get("photo3") as File).name,
          imgUrl: formData.get("photo3") ?? "",
          tag: "INSERT",
        })
      }
    } else {
      fileMap.set("photo3", {
        tag: "DELETE"
      })
    }

    //バリデーション
    const result = postDataSchema.parse(Object.fromEntries(formData));

    const date = new Date(formData.get("fishDate") as string);
    const fishDate = date.toLocaleString()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query;

    if (postId === "") {
      query = supabase
        .from("posts")
        .insert({
          "title": result.title,
          "content": result.content,
          "fish_result": result.fishResult,
          "fish_day": fishDate,
          "weather": result.weather,
          "temperature": result.temperature,
          "water_temperature": result.waterTemperature,
          "category_id": result.category,
          "location": result.location,
          "creator_id": Number(userId)
        })
        .select()

    } else {
      query = supabase
        .from("posts")
        .update({
          "title": result.title,
          "content": result.content,
          "fish_result": result.fishResult,
          "fish_day": fishDate,
          "weather": result.weather,
          "temperature": result.temperature,
          "water_temperature": result.waterTemperature,
          "category_id": result.category,
          "location": result.location,
          "creator_id": Number(userId),
          "updated_at": new Date().toISOString()
        })
        .eq("id", Number(postId))
        .select()
    }

    const { data: queryData, error: queryError } = await query

    if (queryError) {
      throw new ResponseError(`DB処理エラー::::${queryError.message}`, 500);
    }

    if (!queryData) {
      throw new ResponseError("登録後のデータ取得エラー", 400);
    }

    void (async () => {

      // 登録データからpost_id取得
      const returnPostId = queryData[0]["id"]

      for (const [photoArea, targetPhoto] of fileMap.entries()) {

        switch (targetPhoto.tag) {
          case "INSERT":
            await deletePhotoData(String(returnPostId), photoArea);
            await insertPhotoData(String(returnPostId), photoArea, targetPhoto);

            break;
          case "DELETE":
            await deletePhotoData(String(returnPostId), photoArea);

            break;
          case "NONE":
            continue;
        }
      }
      revalidatePath(`/edit/${postId}`);
      revalidatePath(`/detail/${postId}`);
      revalidatePath(`/`);
      revalidatePath(`/${returnPostId}`);
      revalidateTag(`insert/${returnPostId}`);
    })()

    await new Promise(resolve => setTimeout(resolve, 2000))

  } catch (error) {
    if (error instanceof ResponseError) {
      console.error(error);
      return { ...prevState, error: { message: error.message, status: 400 } };
    }

    if (error instanceof z.ZodError) {
      return { ...prevState, fieldErrors: error.formErrors.fieldErrors }
    }
  }

  if (postId) {

    redirect(`/detail/${postId}`);

  } else {

    redirect("/");
  }
};