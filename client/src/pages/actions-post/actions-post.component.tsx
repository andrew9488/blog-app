import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { PostFromField } from "./constants";
import {
  APP_ROUTES,
  CreatePostFormDataType,
  postsService,
  usePosts,
} from "../../shared";

interface ActionsPostPageProps {
  isCreate?: boolean;
}

const ActionsPostPage: React.FC<ActionsPostPageProps> = ({
  isCreate = false,
}) => {
  const navigate = useNavigate();
  const params = useParams();

  const { data } = useQuery({
    queryKey: ["post"],
    queryFn: () => postsService.getPostById(Number(params.id)),
    enabled: !!params.id || isCreate,
  });

  const { register, handleSubmit, resetField } =
    useForm<CreatePostFormDataType>({
      defaultValues: {
        content: data?.post?.content,
        title: data?.post?.title,
      },
    });
  const { createPost, updatePost } = usePosts();

  const onSubmit = handleSubmit((value) => {
    try {
      isCreate
        ? createPost.mutate(value)
        : updatePost.mutate({
            ...value,
            views: data?.post?.views as number,
            id: data?.post?.id as number,
          });
      navigate(
        isCreate ? APP_ROUTES.home : `${APP_ROUTES.posts}/${data?.post?.id}`
      );
    } catch (error) {
      console.log(error);
    }
  });

  const clearFormHandler = () => {
    resetField(PostFromField.title);
    resetField(PostFromField.content);
  };

  return (
    <form className="w-1/3 mx-auto py-10" onSubmit={onSubmit}>
      <label className="text-xs text-white opacity-70">
        Post Title:
        <input
          {...register(PostFromField.title)}
          type="text"
          placeholder="Title"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>

      <label className="text-xs text-white opacity-70">
        Content:
        <textarea
          {...register(PostFromField.content)}
          placeholder="Content"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700"
        />
      </label>

      <div className="flex gap-8 items-center justify-center mt-4">
        <button className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
          {isCreate ? "Create" : "Update"}
        </button>

        <button
          onClick={clearFormHandler}
          className="flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default React.memo(ActionsPostPage);
