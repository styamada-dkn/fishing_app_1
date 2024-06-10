import Image from "next/image";

type Props = {
  imageUrl?: string;
  size?: "small" | "medium" | "large";
  useLoader?: boolean;
};

const default_avatar_img = "/default_avatot.jpg";

const Avatar = ({ size = "medium", useLoader = false, imageUrl }: Props) => {
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
          src={imageUrl}
          alt="画像"
          width={imageSize[0]}
          height={imageSize[1]}
          className="w-full h-auto inline bg-primary  hover:opacity-90"
        />
      ) : (
        <Image
          src={default_avatar_img}
          alt="画像"
          width={imageSize[0]}
          height={imageSize[1]}
          className="w-full h-auto inline bg-primary  hover:opacity-90"
        />
      )}
    </>
  );
};

export default Avatar;
