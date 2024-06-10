import { redirect } from "next/navigation";
import { supabase } from "../db/supabaseClient";
import { ResponseError } from "../utils/errorHandle";
import { PhotoAreaType } from "./insertOrUpdatePostData";
import { revalidateTag } from "next/cache";

export const deletePhotoData = async (
  post_id: string,
  photoArea: PhotoAreaType
) => {
  try {
    const folder = post_id;
    const targetPath = `${folder}/${photoArea}`;

    //フォルダ内の画像取得
    const { data: list, error: listGetError } = await supabase.storage
      .from("posts")
      .list(`${targetPath}`);

    if (listGetError) {
      throw new ResponseError(
        `登録済み画像取得エラー::::${listGetError.message}`,
        400
      );
    }

    const filesToRemoveList = list.map((oldfile) => {
      return `${targetPath}/${oldfile.name}`;
    });

    if (filesToRemoveList.length > 0) {
      //画像削除
      const { error: photoDeleteError } = await supabase.storage
        .from("posts")
        .remove(filesToRemoveList);

      if (photoDeleteError) {
        throw new ResponseError(
          `画像削除エラー::::${photoDeleteError.message}`,
          400
        );
      }
    }

    const deleteStatement = { photo_area: photoArea };

    //レコード削除
    const { data: deleteData, error: queryError } = await supabase
      .from("post_photos")
      .delete()
      .match({ post_id: post_id, ...deleteStatement })
      .select();

    if (queryError) {
      throw new ResponseError(`DB処理エラー::::${queryError.message}`, 500);
    }

    revalidateTag("edit");
    revalidateTag("/");
    revalidateTag(`edit/${post_id}`);

    return { returnData: deleteData, status: 200, message: "データDELETE--OK" };
  } catch (error) {
    if (error instanceof ResponseError) {
      console.error(error);
      return { error: { message: error.message } };
    }
  }

  redirect("/");
};
