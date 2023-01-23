import { useMutation, useQueryClient } from "react-query";

import postsService from "./posts.service";

const usePosts = () => {
  const queryClient = useQueryClient();

  const createPost = useMutation(postsService.createPost, {
    onSuccess() {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const updatePost = useMutation(postsService.updatePost, {
    onSuccess() {
      queryClient.invalidateQueries(["post"]);
    },
  });

  const deletePost = useMutation(postsService.deletePost, {
    onSuccess() {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  return {
    createPost,
    updatePost,
    deletePost,
  };
};

export default usePosts;
