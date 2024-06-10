"use client";

import { FaColumns, FaExclamationCircle } from "react-icons/fa";
import {
  FaCalendarDays,
  FaDatabase,
  FaFeatherPointed,
  FaFishFins,
  FaFlagCheckered,
  FaStar,
} from "react-icons/fa6";
import { Button } from "../button/Button";
import PhotoContainer from "@/app/(site)/_components/PhotoContainer";
import { ArticleType, CategoryItemsType, PhotoType } from "@/constants/types";
import { FC, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import DeleteBtnForm from "./DeleteBtnForm";
import { insertOrUpdatePostData } from "@/lib/services/insertOrUpdatePostData";
import { initialFormState } from "./state";

function TitleFrom({ defaultValue }: { defaultValue?: string }) {
  return (
    <>
      <section className="rounded-lg bg-transparent">
        <div className="flex justify-between rounded-t-lg bg-warning px-2">
          <div className="flex items-center">
            <FaStar className="size-4" />
            <label htmlFor="title" className="pl-2 font-semibold leading-7">
              タイトル
            </label>
          </div>
          <div className="flex items-center text-sm text-error">
            <FaExclamationCircle className="size-3" />
            <span>必須</span>
          </div>
        </div>
        <div className="w-full">
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={defaultValue}
            required
            placeholder="タイトル"
            className="w-full rounded-b-md border-0 p-2 shadow-sm outline-1 ring-1 ring-inset ring-secondary"
          />
        </div>
      </section>
    </>
  );
}

function CategoryForm({
  selectedItem,
  categoryList,
}: {
  selectedItem?: string;
  categoryList?: Omit<CategoryItemsType, "icon">[];
}) {
  return (
    <>
      <section className="mt-2 rounded-lg bg-transparent">
        <div className="flex justify-between rounded-t-lg bg-warning px-2">
          <div className="flex items-center">
            <FaColumns className="size-4" />
            <label
              htmlFor="category_id"
              className="pl-2 font-semibold leading-7"
            >
              ジャンル
            </label>
          </div>
          <div className="flex items-center text-sm text-error">
            <FaExclamationCircle className="size-3" />
            <span>必須</span>
          </div>
        </div>
        <div className="w-full">
          <select
            name="category"
            id="category_id"
            defaultValue={selectedItem}
            className="w-full rounded-b-md border-0 p-2 shadow-sm outline-1 ring-1 ring-inset ring-secondary"
          >
            <option value="" key="0">
              選択してください
            </option>
            {categoryList?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </section>
    </>
  );
}

function FishingDayForm({ defaultValue }: { defaultValue?: string }) {
  return (
    <>
      <section className="mt-2 rounded-lg bg-third">
        <div className="flex justify-between rounded-t-lg bg-warning px-2">
          <div className="flex items-center">
            <FaCalendarDays className="size-4" />
            <label htmlFor="fishDate" className="pl-2 font-semibold leading-7">
              釣行日
            </label>
          </div>
          <div className="flex items-center text-sm text-error">
            <FaExclamationCircle className="size-3" />
            <span>必須</span>
          </div>
        </div>
        <div className="w-full">
          <input
            type="date"
            name="fishDate"
            id="fishDate"
            min="2024-01-01"
            max="2999-12-31"
            defaultValue={defaultValue}
            required
            className="w-full max-w-48 rounded-b-md border-0 p-2 shadow-sm outline-1 ring-1 ring-inset ring-secondary"
          />
        </div>
      </section>
    </>
  );
}

function FishingResultForm({ defaultValue }: { defaultValue?: string }) {
  return (
    <>
      <section className="mt-2 rounded-lg bg-third">
        <div className="flex items-center rounded-t-lg bg-warning px-2">
          <FaFishFins className="size-4" />
          <label htmlFor="fishResult" className="pl-2 font-semibold leading-7">
            釣果
          </label>
        </div>
        <div className="w-full">
          <input
            type="text"
            name="fishResult"
            id="fishResult"
            defaultValue={defaultValue}
            placeholder="釣果"
            className="w-full max-w-48 rounded-md border-0 p-2 shadow-sm outline-1 ring-1 ring-inset ring-secondary"
          />
        </div>
      </section>
    </>
  );
}

function FishingInfoForm({
  weather_DefaultValue,
  temperature_DefaultValue,
  waterTemperature_DefaultValue,
  location_DefaultValue,
}: {
  weather_DefaultValue?: string;
  temperature_DefaultValue?: string;
  waterTemperature_DefaultValue?: string;
  location_DefaultValue?: string;
}) {
  return (
    <>
      <section className="mt-2 rounded-lg bg-third pb-2">
        <div className="flex items-center rounded-t-lg bg-warning px-2">
          <FaFlagCheckered className="size-4" />
          <label htmlFor="weather" className="pl-2 font-semibold leading-7">
            天気・場所
          </label>
        </div>
        <div className="">
          <div className="mt-2 flex items-center px-2">
            <span className="pr-2">天気：</span>
            <input
              type="text"
              name="weather"
              id="weather"
              defaultValue={weather_DefaultValue}
              placeholder="天気"
              className="inline max-w-48 rounded-md border-0 p-2 shadow-sm outline-1 ring-1 ring-inset ring-secondary"
            />
          </div>
          <div className="mt-2 flex flex-col px-2 md:flex-row">
            <div className="flex items-center">
              <span className="pr-2">気温：</span>
              <input
                type="text"
                name="temperature"
                id="temperature"
                defaultValue={temperature_DefaultValue}
                placeholder="気温"
                className="inline max-w-32 rounded-md border-0 p-2 shadow-sm outline-1 ring-1 ring-inset ring-secondary"
              />
            </div>
            <div className="mt-2 flex items-center md:mt-0">
              <span className="pr-2 md:pl-3">水温：</span>
              <input
                type="text"
                name="waterTemperature"
                id="waterTemperature"
                defaultValue={waterTemperature_DefaultValue}
                placeholder="水温"
                className="inline max-w-32 rounded-md border-0 p-2 shadow-sm outline-1 ring-1 ring-inset ring-secondary"
              />
            </div>
          </div>
          <div className="mt-2 flex items-center px-2">
            <span className="pr-2">場所：</span>
            <input
              type="text"
              name="location"
              id="location"
              defaultValue={location_DefaultValue}
              placeholder="場所"
              className="inline max-w-32 rounded-md border-0 p-2 shadow-sm outline-1 ring-1 ring-inset ring-secondary"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function ContentForm({ defaultValue }: { defaultValue?: string }) {
  return (
    <>
      <section className="mt-2 rounded-lg bg-transparent">
        <div className="flex justify-between rounded-t-lg bg-warning px-2">
          <div className="flex items-center">
            <FaFeatherPointed className="size-5" />
            <label htmlFor="content" className="pl-2 font-semibold leading-7">
              釣行記事
            </label>
          </div>
          <div className="flex items-center text-sm text-error">
            <FaExclamationCircle className="size-3" />
            <span>必須</span>
          </div>
        </div>
        <div className="w-full break-all">
          <textarea
            name="content"
            id="content"
            defaultValue={defaultValue}
            rows={5}
            required
            placeholder="釣行記事"
            className="w-full resize-none rounded-b-md border-0 p-2 shadow-sm outline-1 ring-1 ring-inset ring-secondary"
          />
        </div>
      </section>
    </>
  );
}

// 新規登録ボタン
const CreateBtnComponent = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      size="small"
      className="w-full font-semibold text-secondary disabled:cursor-not-allowed disabled:bg-secondary/20"
    >
      <div className="flex items-center justify-center">
        <FaDatabase className="size-4" />
        <label className="cursor-pointer pl-2 font-semibold leading-5">
          登録実行
        </label>
      </div>
    </Button>
  );
};
// 更新ボタン
const UpdateBtnComponent = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      size="small"
      className="w-full font-semibold text-secondary disabled:cursor-not-allowed disabled:bg-secondary/20"
    >
      <div className="flex items-center justify-center">
        <FaDatabase className="size-4" />
        <label className="cursor-pointer pl-2 font-semibold leading-5">
          更新実行
        </label>
      </div>
    </Button>
  );
};

interface ArticleFormProps {
  post_id?: string;
  articleData?: ArticleType;
  photoData?: PhotoType[];
  categoryList?: Omit<CategoryItemsType, "icon">[];
}

export interface photoContentsType {
  photo1?: string | null;
  photo2?: string | null;
  photo3?: string | null;
}

const ArticleForm: FC<ArticleFormProps> = ({
  post_id,
  articleData,
  photoData,
  categoryList,
}) => {
  const [imgUrl, setImgUrl] = useState<photoContentsType>({
    photo1: "",
    photo2: "",
    photo3: "",
  });

  const postId: string = post_id ?? "";

  const doAction = insertOrUpdatePostData.bind(null, postId);

  const [state, dispatch] = useFormState(doAction, initialFormState());

  return (
    <>
      <form action={dispatch}>
        <div className="flex flex-col justify-center gap-x-5 md:flex-row">
          <div className="order-1 md:order-1 md:w-80">
            {/* 写真エリア */}
            <PhotoContainer
              photoData={photoData}
              onSetImgUrl={setImgUrl}
              onGetImgUrl={imgUrl}
            />
          </div>
          <div>
            <input
              type="hidden"
              name="photoImg1"
              value={imgUrl?.photo1 ?? ""}
            />
            <input
              type="hidden"
              name="photoImg2"
              value={imgUrl?.photo2 ?? ""}
            />
            <input
              type="hidden"
              name="photoImg3"
              value={imgUrl?.photo3 ?? ""}
            />
          </div>
          <div className="order-2 md:order-2 md:flex-1">
            <div className="mt-2 md:mt-0">
              {/* タイトル */}
              <TitleFrom defaultValue={articleData?.title} />
              <div>
                {!!state?.fieldErrors?.title?.length && (
                  <span className="text-error">
                    {state?.fieldErrors?.title}
                  </span>
                )}
              </div>
              {/* ジャンル（カテゴリー） */}
              <CategoryForm
                selectedItem={articleData?.category_id}
                categoryList={categoryList}
              />
              <div>
                {!!state?.fieldErrors?.category?.length && (
                  <span className="text-error">
                    {state?.fieldErrors?.category}
                  </span>
                )}
              </div>
              {/* 釣行日 */}
              <FishingDayForm defaultValue={articleData?.fish_day} />
              {/* 釣果 */}
              <FishingResultForm defaultValue={articleData?.fish_result} />
              <div>
                {!!state?.fieldErrors?.fishResult?.length && (
                  <span className="text-error">
                    {state?.fieldErrors?.fishResult}
                  </span>
                )}
              </div>
              {/* 天気・場所 */}
              <FishingInfoForm
                weather_DefaultValue={articleData?.weather}
                temperature_DefaultValue={articleData?.temperature}
                waterTemperature_DefaultValue={articleData?.water_temperature}
                location_DefaultValue={articleData?.location}
              />
              <div>
                {!!state?.fieldErrors?.weather?.length && (
                  <span className="block text-error">
                    {state?.fieldErrors?.weather}
                  </span>
                )}
                {!!state?.fieldErrors?.temperature?.length && (
                  <span className="block text-error">
                    {state?.fieldErrors?.temperature}
                  </span>
                )}
                {!!state?.fieldErrors?.waterTemperature?.length && (
                  <span className="block text-error">
                    {state?.fieldErrors?.waterTemperature}
                  </span>
                )}
                {!!state?.fieldErrors?.location?.length && (
                  <span className="block text-error">
                    {state?.fieldErrors?.location}
                  </span>
                )}
              </div>
              {/* 釣行記事 */}
              <ContentForm defaultValue={articleData?.content} />
              <div>
                {!!state?.fieldErrors?.content?.length && (
                  <span className="block text-error">
                    {state?.fieldErrors?.content}
                  </span>
                )}
              </div>
              {/* 登録・更新・削除ボタン */}
              <section className="mt-4">
                {post_id ? (
                  <div className="flex flex-col gap-y-2">
                    <UpdateBtnComponent />
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <CreateBtnComponent />
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </form>
      <div className="mt-5 flex w-full items-center justify-center">
        <div className="min-w-28">
          {post_id && <DeleteBtnForm post_id={post_id} />}
        </div>
      </div>
    </>
  );
};

export default ArticleForm;
