"use client";
import PhotoImage from "@/app/components/photo/PhotoImage";
import { PhotoType } from "@/constants/types";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { FaCamera } from "react-icons/fa6";
import classNames from "classnames" 

interface PhotoAreaProps {
  photoData?: PhotoType[];
}
const PhotoArea: FC<PhotoAreaProps> = ({ photoData }) => {
  const photoFrameStyle = classNames(
    ["w-52", "max-w-52", "h-auto", "max-h-72"],
    "mt-2",
    "bg-transparent"
  );

  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  const initialState = {
    photo1: { image_url: "" },
    photo2: { image_url: "" },
    photo3: { image_url: "" },
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

  return (
    <div className="min-h-72 bg-third rounded-lg">
      <div className="bg-form text-neutral rounded-t-lg flex justify-center items-center">
        <FaCamera className="size-5" />
        <h3 className="font-bold pl-2 leading-8">釣行写真</h3>
      </div>
      <div className="flex flex-col p-2 items-center md:flex-row md:flex-wrap md:justify-evenly h-full">
        <div className={photoFrameStyle}>
          <PhotoImage imageUrl={photoList.photo1.image_url ?? ""} />
          <div className="text-center">
            <span>写真１</span>
          </div>
        </div>
        <div className={photoFrameStyle}>
          <PhotoImage imageUrl={photoList.photo2.image_url ?? ""} />
          <div className="text-center">
            <span>写真２</span>
          </div>
        </div>
        <div className={photoFrameStyle}>
          <PhotoImage imageUrl={photoList.photo3.image_url ?? ""} />
          <div className="text-center">
            <span>写真３</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoArea;
