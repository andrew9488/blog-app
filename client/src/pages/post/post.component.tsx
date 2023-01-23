import React from "react";
import {
  AiFillDelete,
  AiFillEye,
  AiOutlineMessage,
  AiTwotoneEdit,
} from "react-icons/ai";
import Moment from "react-moment";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";

import { APP_ROUTES, postsService, usePosts } from "../../shared";

import { Comment } from "./components/comment";
import { CommentForm } from "./components/comment-form";

interface PostPageProps {
  userId: number;
}

const PostPage: React.FC<PostPageProps> = ({ userId = 0 }) => {
  const navigate = useNavigate();
  const params = useParams();

  const { deletePost } = usePosts();

  const { data, isLoading } = useQuery({
    queryKey: ["post"],
    queryFn: () => postsService.getPostById(Number(params.id)),
    enabled: !!params.id,
  });

  const onBackClick = () => {
    navigate(APP_ROUTES.home);
  };

  const removePostHandler = () => {
    try {
      deletePost.mutate(Number(params.id));
      navigate(APP_ROUTES.home);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className="text-xl text-center text-white py-10">Loading...</div>
    );
  }
  return (
    <div>
      <button
        className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
        onClick={onBackClick}
      >
        Back
      </button>

      <div className="flex gap-10 py-8">
        <div className="w-2/3">
          <div className="flex justify-between items-center pt-2">
            <div className="text-xs text-white opacity-50">
              {data?.post?.author?.username}
            </div>
            <div className="text-xs text-white opacity-50">
              <Moment date={data?.post?.createdAt} format="D MMM YYYY" />
            </div>
          </div>
          <div className="text-white text-xl">{data?.post?.title}</div>
          <p className="text-white opacity-60 text-xs pt-4">
            {data?.post?.content}
          </p>

          <div className="flex gap-3 items-center mt-2 justify-between">
            <div className="flex gap-3 mt-4">
              <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                <AiFillEye /> <span>{data?.post?.views}</span>
              </button>
              <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                <AiOutlineMessage />{" "}
                <span>{data?.post.comments?.length || 0} </span>
              </button>
            </div>

            {userId === data?.post.authorId && (
              <div className="flex gap-3 mt-4">
                <button className="flex items-center justify-center gap-2 text-white opacity-50">
                  <Link to={`${APP_ROUTES.posts}/edit-post/${params.id}`}>
                    <AiTwotoneEdit />
                  </Link>
                </button>
                <button
                  onClick={removePostHandler}
                  className="flex items-center justify-center gap-2  text-white opacity-50"
                >
                  <AiFillDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm">
          <CommentForm />
          {data?.post.comments?.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(PostPage);
