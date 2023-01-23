import { useMutation, useQueryClient } from "react-query";

import commentsService from "./comments.service";

const useComments = () => {
  const queryClient = useQueryClient();

  const createComment = useMutation(commentsService.createComment, {
    onSuccess() {
      queryClient.invalidateQueries(["post"]);
    },
  });

  const deleteComment = useMutation(commentsService.deleteComment, {
    onSuccess() {
      queryClient.invalidateQueries(["post"]);
    },
  });

  return {
    createComment,
    deleteComment,
  };
};

export default useComments;
