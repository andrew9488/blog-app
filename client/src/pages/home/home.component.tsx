import { useQuery } from "react-query";

import { PostItem } from "./components/post";
import { PopularPost } from "./components/popular-post";
import { postsService } from "../../shared";

const HomePage = () => {
  const { data, isLoading } = useQuery(["posts"], postsService.getAllPosts, {
    initialData: {
      posts: [],
      popularPosts: [],
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-[900px] mx-auto py-10">
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-10 basis-4/5">
          {data?.posts?.map((post) => (
            <PostItem key={post?.id} post={post} />
          ))}
        </div>
        <div className="basis-1/5">
          <div className="text-xs uppercase text-white">Popular posts:</div>

          {data?.popularPosts?.map((post) => (
            <PopularPost key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
