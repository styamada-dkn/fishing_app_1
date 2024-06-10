import { photoContentsType } from "@/app/components/form/ArticleForm";
import PhotoImage from "@/app/components/photo/PhotoImage";
import { PhotoType } from "@/constants/types";
import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { FaCamera } from "react-icons/fa6";
import classNames from "classnames" 

interface PhotoContainerProps {
  photoData?: PhotoType[];
  onSetImgUrl: Dispatch<SetStateAction<photoContentsType>>;
  onGetImgUrl: photoContentsType;
}

const PhotoContainer: FC<PhotoContainerProps> = ({
  photoData,
  onSetImgUrl,
  onGetImgUrl,
}) => {
  const imgRefPhoto1 = useRef<HTMLInputElement>(null);
  const imgRefPhoto2 = useRef<HTMLInputElement>(null);
  const imgRefPhoto3 = useRef<HTMLInputElement>(null);

  useEffect(() => {
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
    onSetImgUrl((prev) => {
      return { ...prev, photo1: photoList.photo1.image_url };
    });
    onSetImgUrl((prev) => {
      return { ...prev, photo2: photoList.photo2.image_url };
    });
    onSetImgUrl((prev) => {
      return { ...prev, photo3: photoList.photo3.image_url };
    });
  }, [onSetImgUrl, photoData]);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file) {
      if (file.type.match(/^image\/(png|jpeg|jpg)$/)) {
        onSetImgUrl((prev) => {
          return {
            ...prev,
            [e.target.name]: URL.createObjectURL(file),
          };
        });
      }
    }
  };

  const handelDeleteFile = (id: string): void => {
    switch (id) {
      case "1":
        onSetImgUrl((prev) => {
          return { ...prev, photo1: "" };
        });
        (imgRefPhoto1.current as HTMLInputElement).value = "";
        if (onGetImgUrl.photo1) {
          URL.revokeObjectURL(onGetImgUrl.photo1);
        }
        break;
      case "2":
        onSetImgUrl((prev) => {
          return { ...prev, photo2: "" };
        });
        (imgRefPhoto2.current as HTMLInputElement).value = "";
        if (onGetImgUrl.photo2) {
          URL.revokeObjectURL(onGetImgUrl.photo2);
        }
        break;
      case "3":
        onSetImgUrl((prev) => {
          return { ...prev, photo3: "" };
        });
        (imgRefPhoto3.current as HTMLInputElement).value = "";
        if (onGetImgUrl.photo3) {
          URL.revokeObjectURL(onGetImgUrl.photo3);
        }
        break;
    }
  };

  const photoButtonStyle = classNames(
    "bg-accent",
    "text-sm",
    "text-info",
    "hover:opacity-90",
    "cursor-pointer",
    "border",
    "rounded-2xl",
    "py-1",
    "px-2",
    "shadow-md"
  );

  const photoFrameStyle = classNames(
    ["w-52", "max-w-52", "h-auto", "max-h-72"],
    "mt-2",
    "bg-transparent"
  );
  return (
    <div className="min-h-72 bg-third rounded-lg">
      <div className="bg-form text-neutral rounded-t-lg flex justify-center items-center">
        <FaCamera className="size-5" />
        <h3 className="font-bold pl-2 leading-7">釣行写真</h3>
      </div>
      <div className="flex flex-col px-2 pb-2 items-center md:flex-row md:flex-wrap md:justify-evenly h-full">
        <div className={photoFrameStyle}>
          <PhotoImage imageUrl={onGetImgUrl.photo1 ?? ""} />

          <div className="text-center flex items-center justify-between">
            {/* 写真１ */}
            <label className={photoButtonStyle}>
              画像を選択
              <input
                type="file"
                name="photo1"
                id="photo1"
                accept="image/jpeg, image/png"
                className="hidden"
                ref={imgRefPhoto1}
                onChange={(e) => handleChangeFile(e)}
              />
            </label>
            <label>
              <div
                onClick={() => {
                  handelDeleteFile("1");
                }}
                className={photoButtonStyle}
              >
                画像クリア
              </div>
            </label>
          </div>
        </div>
        <div className={photoFrameStyle}>
          <PhotoImage imageUrl={onGetImgUrl.photo2 ?? ""} />

          <div className="text-center flex items-center justify-between">
            {/* 写真２ */}
            <label className={photoButtonStyle}>
              画像を選択
              <input
                type="file"
                name="photo2"
                id="photo2"
                accept="image/jpeg, image/png"
                className="hidden"
                ref={imgRefPhoto2}
                onChange={(e) => handleChangeFile(e)}
              />
            </label>
            <label>
              <div
                onClick={() => {
                  handelDeleteFile("2");
                }}
                className={photoButtonStyle}
              >
                画像クリア
              </div>
            </label>
          </div>
        </div>
        <div className={photoFrameStyle}>
          <PhotoImage imageUrl={onGetImgUrl.photo3 ?? ""} />

          <div className="text-center flex items-center justify-between">
            {/* 写真３ */}
            <label className={photoButtonStyle}>
              画像を選択
              <input
                type="file"
                name="photo3"
                id="photo3"
                accept="image/jpeg, image/png"
                className="hidden"
                ref={imgRefPhoto3}
                onChange={(e) => handleChangeFile(e)}
              />
            </label>
            <label>
              <div
                onClick={() => {
                  handelDeleteFile("3");
                }}
                className={photoButtonStyle}
              >
                画像クリア
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoContainer;
