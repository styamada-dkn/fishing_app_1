import { PostType } from "@/constants/types";
import { PageInfoType } from "../utils/paginate";
import { ResponseError } from "../utils/errorHandle";

interface Props {
  page?: string;
  perPage?: string;
  query?: string;
}

export const getPosts = async ({
  page = "1",
  perPage = "10",
  query = "",
}: Props): Promise<{
  posts: PostType[];
  pageInfo: PageInfoType;
}> => {

  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const searchParams = new URLSearchParams();
    searchParams.set("page", page);
    searchParams.set("perPage", perPage);
    searchParams.set("query", query);

    const response = await fetch(`${API_URL}/api/posts?${searchParams.toString()}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new ResponseError(response.statusText, response.status);
    }

    return await response.json() as {
      posts: PostType[];
      pageInfo: PageInfoType;
    };

  } catch (error) {
    console.error("Error:::", error);
    if (error instanceof ResponseError) {
      console.error("Fetch-Error:::", error);
    }
    throw error;
  }
};