import { supabase } from "../db/supabaseClient";
import { ResponseError } from "../utils/errorHandle";

export const deletePhotoWithId = async (post_id: string) => {

  const photoAreas = ["photo1", "photo2", "photo3"] as const

  try {

    const folder = post_id;
    const filesToRemoveList = [];

    //フォルダ内の画像取得
    for (const area of photoAreas) {
      const targetPath = `${folder}/${area}`

      const { data: list, error: listGetError } = await supabase.storage
        .from("posts")
        .list(`${targetPath}`)

      if (listGetError) {
        throw new ResponseError(`登録画像リスト取得エラー::::${listGetError.message}`, 400);
      }

      for (const fileData of list) {
        filesToRemoveList.push(`${targetPath}/${fileData.name}`);
      }
    }

    if (filesToRemoveList.length > 0) {
      //画像削除
      const { error: photoDeleteError } = await supabase.storage
        .from("posts")
        .remove(filesToRemoveList);

      if (photoDeleteError) {
        throw new ResponseError(`画像削除エラー::::${photoDeleteError.message}`, 400);
      }
    }

    return { returnData: null, status: 200, message: "画像ファイル削除--OK" };

  } catch (error) {
    if (error instanceof ResponseError) {
      console.error(error);
      return { error: { message: error.message } };
    }

  }

}