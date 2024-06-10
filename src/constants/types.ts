import { ReactNode } from "react";
import { Tables } from "./schema";

export const APP_TITLE = "釣り自慢倶楽部デモサイト";

//ヘッダーの表示内容を制御
export const ContentsPath = {
  TOP: "/",
  SIGNIN: "/signin",
  DETAIL: "/detail",
  NEW: "/new",
  EDIT: "/edit",
  DELETE: "delete",
};

//認証ユーザ情報
export interface UserAccountType {
  id: string | null;
  name: string | null;
  email: string | null;
  image: string | null;
}

//記事詳細画面用
export interface ArticleType {
  id: number;
  title: string;
  content: string;
  fish_day: string;
  fish_result: string;
  weather: string;
  temperature: string;
  water_temperature: string;
  location: string;
  category_id: string;
  category_name: string;
  creator_id: number;
  creator_name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

//記事一覧画面用
export interface PostType extends Tables<"posts"> {
  mst_category: {
    label: string;
  } | null;
  mst_accounts: {
    email: string;
    name: string;
  } | null;
  post_liked: {
    count: number | null;
  }[];
  post_photos: {
    image_url: string | null;
    photo_area: string | null;
  }[];
  post_comments: {
    comment: string | null;
    commenter_id: number | null;
    commenter_name: string | null;
  }[];
}

//コメント情報
export interface CommentType extends Tables<"post_comments"> {
  commenter_name: string;
}

//いいね情報
export interface LikedType extends Tables<"post_liked"> {}

//写真情報
export interface PhotoType extends Tables<"post_photos"> {}

//カテゴリー
export interface CategoryItemsType extends Tables<"mst_category"> {
  icon?: ReactNode;
}

// カテゴリーの親子関係
export enum MenuNode {
  PARENT = 1,
  CHILDREN = 2,
}
export type CategoryType = MenuNode.PARENT | MenuNode.CHILDREN;

// メニュー用
export interface MenuItems {
  id: string;
  link: string;
  content: ReactNode;
  subMenuList: CategoryItemsType[] | null;
}
