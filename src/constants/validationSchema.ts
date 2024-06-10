import { z } from "zod";

export const postDataSchema = z.object(
  {
    title: z.string().min(1, "入力してください").max(20, "２０文字以内で入力してください"),
    content: z.string().min(1, "").max(200, "２００文字以内で入力してください"),
    fishResult: z.string().max(10, "１０文字以内で入力してください"),
    weather: z.string().max(10, "天気を１０文字以内で入力してください"),
    temperature: z.string().max(5, "気温を５文字以内で入力してください"),
    waterTemperature: z.string().max(5, "水温を５文字以内で入力してください"),
    location: z.string().max(5, "場所を５文字以内で入力してください"),
    category: z.string().min(1, "ジャンルを選択してください"),
  }
)

export const credentialSignInSchema = z.object({
  username: z
    .string()
    .min(1, { message: "ユーザIDを入力してください" })
    .max(10, { message: "10文字以内で入力してください" }),
  password: z
    .string()
    .min(8, { message: "パスワードは8文字以上で入力してください" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
      message:
        "パスワードは8文字以上の英数字かつアルファベットと数字が1文字以上含まれている必要があります",
    }),
});
export const CommentSchema = z.object({
  commentdata: z
    .string()
    .min(1, { message: "コメントを入力してください" })
    .max(100, { message: "100文字以内で入力してください" }),
});