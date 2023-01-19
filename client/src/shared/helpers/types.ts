export type AuthFormDataType = {
  username: string;
  password: string;
};

export type CreatePostFormDataType = {
  title: string;
  content: string;
};

export type PostType = {
  authorId: number;
  content: string;
  id: number;
  title: string;
  views: number;
  author?: UserType;
  createdAt: Date;
  comments?: CommentType[];
};

export type UserType = {
  id: number;
  username: string;
  password: string;
  posts?: PostType[];
};

export type CommentType = {
  id: number;
  content: string;
  post?: PostType;
  postId: number;
};
