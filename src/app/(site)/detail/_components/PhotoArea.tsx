"use client";
import { PhotoType } from "@/constants/types";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa6";
import classNames from "classnames";
import Image from "next/image";

export interface photoContentsType {
  photo1?: string | null;
  photo2?: string | null;
  photo3?: string | null;
}

interface PhotoAreaProps {
  photoData?: PhotoType[];
}
const PhotoArea: FC<PhotoAreaProps> = ({ photoData }) => {
  const [imgUrl, setImgUrl] = useState<photoContentsType>({
    photo1: "",
    photo2: "",
    photo3: "",
  });

  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  useEffect(() => {
    const initialState = {
      photo1: { image_url: "/no_image.jpg" },
      photo2: { image_url: "/no_image.jpg" },
      photo3: { image_url: "/no_image.jpg" },
    };

    const photoList = !photoData
      ? initialState
      : photoData.reduce((acc, photo) => {
          switch (photo.photo_area) {
            case "photo1":
              acc.photo1.image_url = photo.image_url ?? "";
              break;
            case "photo2":
              acc.photo2.image_url = photo.image_url ?? "";
              break;
            case "photo3":
              acc.photo3.image_url = photo.image_url ?? "";
              break;
            default:
          }
          return acc;
        }, initialState);
    setImgUrl((prev) => {
      return { ...prev, photo1: photoList.photo1.image_url };
    });
    setImgUrl((prev) => {
      return { ...prev, photo2: photoList.photo2.image_url };
    });
    setImgUrl((prev) => {
      return { ...prev, photo3: photoList.photo3.image_url };
    });
  }, [photoData]);

  const photoFrameStyle = classNames(
    ["w-52", "max-w-52", "h-[212px]"],
    "mt-2",
    "bg-transparent",
    "relative"
  );

  return (
    <div className="min-h-72 rounded-lg bg-third">
      <div className="flex items-center justify-center rounded-t-lg bg-form text-neutral">
        <FaCamera className="size-5" />
        <h3 className="pl-2 font-bold leading-8">釣行写真</h3>
      </div>
      <div className="flex h-full flex-col items-center p-2 md:flex-row md:flex-wrap md:justify-evenly">
        <div className={photoFrameStyle}>
          <Image
            src={imgUrl.photo1 ?? ""}
            alt="image"
            fill
            className="object-cover"
          />
          <p className="absolute left-0 top-0 z-10 border border-secondary bg-neutral text-sm text-secondary">
            写真１(メイン)
          </p>
        </div>
        <div className={photoFrameStyle}>
          <Image
            src={imgUrl.photo2 ?? ""}
            alt="image"
            fill
            className="object-cover"
          />
          <p className="absolute left-0 top-0 z-10 border border-secondary bg-neutral text-sm text-secondary">
            写真２
          </p>
        </div>
        <div className={photoFrameStyle}>
          <Image
            src={imgUrl.photo3 ?? ""}
            alt="image"
            fill
            className="object-cover"
          />
          <p className="absolute left-0 top-0 z-10 border border-secondary bg-neutral text-sm text-secondary">
            写真３
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhotoArea;
