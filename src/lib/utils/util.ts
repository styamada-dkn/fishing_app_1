import { ContentsPath } from "@/constants/types";

interface returnType {
  post_id: string;
  buttonPath: string;
}
export function getPathnameWithHeaderBtn(pathname: string): returnType {
  let buttonPath: string = "/";
  let post_id: string = "";

  switch (true) {
    case pathname === ContentsPath.TOP:
      // 現在ページがトップページの場合は「投稿するボタン」へのパス
      buttonPath = ContentsPath.NEW;
      break;
    case pathname.startsWith(ContentsPath.DETAIL):
      // 現在ページが詳細ページの場合は「編集ボタン」へのパス
      post_id = pathname.replace(`${ContentsPath.DETAIL}/`, "");
      buttonPath = `${ContentsPath.EDIT}/${post_id}`;
      break;
    default:
      break;
  }
  return { post_id, buttonPath };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isValidPageNumber(val: any): boolean {
  if (val == null) {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (isNaN(val)) {
    return false;
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!Number.isInteger(parseInt(val))) {
    return false;
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!Number.isInteger(parseFloat(val))) {
    return false;
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (parseInt(val) > 0) {
    return true;
  }
  return false;
}

export function formateDateTime(val: string): string {
  const dt = new Date(val);
  const day = dt.toLocaleDateString("ja-JP");
  const tm = dt.toLocaleTimeString("ja-JP");

  return `${day}  ${tm}`;
}
