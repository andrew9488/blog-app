import React from "react";
import { AiFillEye, AiOutlineMessage } from "react-icons/ai";
import Moment from "react-moment";
import { Link } from "react-router-dom";

import { APP_ROUTES, PostType, usePosts } from "../../../../shared";

interface PostItemProps {
  post: PostType;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const { updatePost } = usePosts();

  const onUpdatePostHandler = () => {
    updatePost.mutate({
      content: post.content,
      title: post.title,
      views: ++post.views,
      id: post.id,
    });
  };

  if (!post) {
    return (
      <div className="text-xl text-center text-white py-10">Loading...</div>
    );
  }
  return (
    <Link to={`${APP_ROUTES.posts}/${post.id}`} onClick={onUpdatePostHandler}>
      <div className="flex flex-col basis-1/4 flex-grow">
        <div className="flex justify-between items-center pt-2">
          <div className="text-xs text-white opacity-50">
            {post.author?.username}
          </div>
          <div className="text-xs text-white opacity-50">
            <Moment date={post.createdAt} format="D MMM YYYY" />
          </div>
        </div>
        <div className="text-white text-xl">{post.title}</div>
        <p className="text-white opacity-60 text-xs pt-4 line-clamp-4">
          {post.content.slice(0, post.content.length / 2)}...
        </p>

        <div className="flex gap-3 items-center mt-2">
          <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
            <AiFillEye /> <span>{post.views}</span>
          </button>
          <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
            <AiOutlineMessage /> <span>{post.comments?.length || 0} </span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default React.memo(PostItem);
