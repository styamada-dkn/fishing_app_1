"use server";

import { supabase } from "../db/supabaseClient";
import { ResponseError } from "../utils/errorHandle";
import { QueryData } from "@supabase/supabase-js";

export type ResultType = {
  returnData: {
    account_id: number;
    mst_accounts: {
      email: string;
      name: string;
      thumbnail: string | null;
    } | null;
  }[] | null,
  message: string;
  status: number;
}
export const getCredentialsUser = async (username: string, password: string): Promise<ResultType> => {
  try {
    // パスワードチェックは省略
    const query = supabase
      .from("mst_credentials")
      .select(
        `
        account_id,
        mst_accounts(
          email,
          name,
          thumbnail
        )
        `
      )
      .eq("user_name", username)

    type queryType = QueryData<typeof query>

    const { data, error } = await query

    if (error) {
      throw new ResponseError("DB処理エラー::::", 500);
    }

    const resultData: queryType = data;

    if (!data) {
      return { returnData: null, message: "該当ユーザーが存在しません。", status: 400 };
    }

    return {
      returnData: resultData, message: "該当ユーザー取得OK", status: 200
    }

  } catch (error) {
    console.error("Error:::", error);
    if (error instanceof ResponseError) {
      console.error("DB-Error:::", error);
    }
    throw error;
  }
};
