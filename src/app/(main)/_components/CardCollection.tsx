"use client";
import { PostType } from "@/constants/types";
import CardContainer from "./CardContainer";
import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";

interface CardCollectionProps {
  posts: PostType[] | null;
}

const CardCollection: FC<CardCollectionProps> = ({ posts }) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <>
      {posts?.map((post) => (
        <div key={post.id}>
          <CardContainer post={post} />
        </div>
      ))}
    </>
  );
};

export default CardCollection;
