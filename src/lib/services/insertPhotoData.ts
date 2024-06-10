import { supabase } from "../db/supabaseClient";
import { ResponseError } from "../utils/errorHandle";
import { FileListType, PhotoAreaType } from "./insertOrUpdatePostData";

export const insertPhotoData = async (
  post_id: string,
  photoArea: PhotoAreaType,
  fileList: FileListType
) => {
  try {
    const folder = post_id;
    const targetPath = `${folder}/${photoArea}`;

    const filePath = `${targetPath}/${fileList.name}`;

    //画像をストレージへアップロード
    const { error: photoUploadError } = await supabase.storage
      .from("posts")
      .upload(filePath, fileList.imgUrl!);

    if (photoUploadError) {
      throw new ResponseError(
        `画像登録エラー::::${photoUploadError.message}`,
        400
      );
    }

    // アップロードした画像のURLを取得
    const { data: returnPath } = supabase.storage
      .from("posts")
      .getPublicUrl(filePath);

    const insertStatement = {
      image_url: returnPath.publicUrl,
      photo_area: photoArea,
    };

    //レコード追加
    const { data: insertData, error: photoInsertError } = await supabase
      .from("post_photos")
      .insert({
        post_id: Number(post_id),
        ...insertStatement,
      })
      .select();

    if (photoInsertError) {
      throw new ResponseError(
        `post_photos登録エラー::::${photoInsertError.message}`,
        400
      );
    }

    return { returnData: insertData, status: 200, message: "データINSERT-OK" };
  } catch (error) {
    if (error instanceof ResponseError) {
      console.error(error);
      return { error: { message: error.message } };
    }
  }
};
