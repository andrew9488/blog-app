import axiosApiInstance from "../api";

const commentsService = {
  createComment(data: { content: string; postId: number }) {
    return axiosApiInstance
      .post("/comments/create", data)
      .then((res) => res.data);
  },
  deleteComment(postId: number) {
    return axiosApiInstance
      .delete(`/comments/delete/${postId}`)
      .then((res) => res.data);
  },
};

export default commentsService;
