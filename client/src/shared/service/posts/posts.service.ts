import axiosApiInstance from "../api";
import { CreatePostFormDataType, PostType } from "./../../helpers/types";

const postsService = {
  getAllPosts() {
    return axiosApiInstance
      .get<{ posts: PostType[]; popularPosts: PostType[] }>("/posts")
      .then((res) => res.data);
  },
  getMyPosts() {
    return axiosApiInstance
      .get<{myPosts: Pick<PostType, "id" | "createdAt" | "title">[]}>(`/posts/my-posts`)
      .then((res) => res.data);
  },
  getPostById(postId: number) {
    return axiosApiInstance
      .get<{ post: PostType }>(`/posts/${postId}`)
      .then((res) => res.data);
  },
  createPost(data: CreatePostFormDataType) {
    return axiosApiInstance.post("/posts/create", data).then((res) => res.data);
  },
  updatePost(data: CreatePostFormDataType & { views: number; id: number }) {
    return axiosApiInstance.put("/posts/update", data).then((res) => res.data);
  },
  deletePost(postId: number) {
    return axiosApiInstance
      .delete(`/posts/delete/${postId}`)
      .then((res) => res.data);
  },
};

export default postsService;
