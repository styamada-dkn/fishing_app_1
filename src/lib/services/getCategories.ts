"use server";

import { supabase } from "../db/supabaseClient";
import { CategoryItemsType } from "@/constants/types";
import { ResponseError } from "../utils/errorHandle";

interface ResultType {
  categories: CategoryItemsType[] | null;
  status: number;
  message: string;
}

export const getCategories = async (): Promise<ResultType> => {
  try {
    const { data, error } = await supabase
      .from("mst_category")
      .select("*")
      .order("display_order");


    if (error) {
      throw new ResponseError("DB処理エラー::::", 500);
    }

    if (!data) {
      return { categories: null, message: "データがありません", status: 400 };
    }

    return { categories: data, status: 200, message: "データ取得OK" };

  } catch (error) {
    console.error("Error:::", error);
    if (error instanceof ResponseError) {
      console.error("DB-Error:::", error);
    }
    throw error;
  }
};
