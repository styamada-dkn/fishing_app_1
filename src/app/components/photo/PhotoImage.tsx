import Image from "next/image";

type Props = {
  imageUrl?: string | Blob;
  size?: "small" | "medium" | "large";
  useLoader?: boolean;
};

const default_no_img = "/no_image.jpg";

const PhotoImage = ({
  size = "medium",
  useLoader = false,
  imageUrl,
}: Props) => {
  let imageSize = [];
  switch (size) {
    case "small":
      imageSize = [90, 90];
      break;
    case "medium":
      imageSize = [112, 112];
      break;
    case "large":
      imageSize = [120, 120];
      break;
    default:
      imageSize = [112, 112];
  }

  return (
    <>
      {imageUrl ? (
        <Image
          src={imageUrl as string}
          alt="画像"
          width={imageSize[0]}
          height={imageSize[1]}
          className="w-full h-auto inline bg-primary  hover:opacity-90"
        />
      ) : (
        <Image
          src={default_no_img}
          alt="画像"
          width={imageSize[0]}
          height={imageSize[1]}
          className="w-full h-auto inline bg-primary"
        />
      )}
    </>
  );
};

export default PhotoImage;
