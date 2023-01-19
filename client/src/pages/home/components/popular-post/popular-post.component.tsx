import React from "react";
import { Link } from "react-router-dom";

import { APP_ROUTES, PostType, usePosts } from "../../../../shared";

interface PopularPostProps {
  post: PostType;
}

const PopularPost: React.FC<PopularPostProps> = ({ post }) => {
  const { updatePost } = usePosts();

  const onUpdatePostHandler = () => {
    updatePost.mutate({
      content: post.content,
      title: post.title,
      views: ++post.views,
      id: post.id,
    });
  };

  return (
    <div className="bg-gray-600 my-1" onClick={onUpdatePostHandler}>
      <Link
        to={`${APP_ROUTES.posts}/${post.id}`}
        className="flex text-xs p-2 text-gray-300 hover:bg-gray-800 hover:text-white"
      >
        {post.title}
      </Link>
    </div>
  );
};

export default React.memo(PopularPost);
