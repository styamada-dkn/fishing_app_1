"use server";

import { supabase } from "../db/supabaseClient";
import { ResponseError } from "../utils/errorHandle";
import { QueryData } from "@supabase/supabase-js";

interface RandomUserType {
  user: {
    account_id: number;
    name?: string;
  } | null
}
interface returnType extends RandomUserType {
  message: string;
  status: number;
}

export const getRandomDemoUser = async (): Promise<returnType> => {
  try {
    // パスワードチェックは省略
    const query = supabase
      .from("mst_credentials")
      .select(
        `
        *,
        mst_accounts(
          email,
          name,
          thumbnail
        )
        `
      )

    type queryType = QueryData<typeof query>

    const { data, error } = await query

    if (error) {
      throw new ResponseError("DB処理エラー::::", 500);
    }

    const resultData: queryType = data;

    if (!data) {
      return { user: null, message: "該当ユーザーが存在しません。", status: 400 };
    }

    const userList: RandomUserType[] = resultData.map((userData) => {
      return {
        user: {
          account_id: userData.account_id,
          name: userData.mst_accounts?.name
        }
      }
    })

    const randomIndex = Math.floor(Math.random() * userList.length);

    const returnUser = userList[randomIndex];

    if (!returnUser) {
      return { user: null, message: "ランダム：ユーザー取得エラー。", status: 400 };
    }

    return {
      ...returnUser, message: "該当ユーザー取得OK", status: 200
    }

  } catch (error) {
    console.error("Error:::", error);
    if (error instanceof ResponseError) {
      console.error("DB-Error:::", error);
    }
    throw error;
  }
};
