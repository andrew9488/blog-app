import { Post } from "@prisma/client";
import { inject, injectable } from "inversify";

import { IPrismaService } from "../database/prisma.service";
import { TYPES } from "../shared/constants";

type CreatePostData = {
  title: string;
  content: string;
  authorId: number;
};

type UpdatePostData = Omit<CreatePostData, "authorId">;

export interface IPostsRepository {
  createPost: (data: CreatePostData) => Promise<Post>;
  updatePost: (id: number, data: UpdatePostData) => Promise<Post>;
  deletePost: (id: number) => Promise<Post>;
}

@injectable()
export class PostsRepository implements IPostsRepository {
  @inject(TYPES.PrismaService) private prismaService: IPrismaService;

  constructor() {
    this.createPost = this.createPost.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }
  async createPost({ title, content, authorId }: CreatePostData) {
    return this.prismaService.client.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });
  }
  async updatePost(id: number, { title, content }: UpdatePostData) {
    return this.prismaService.client.post.update({
      where: { id },
      data: { title, content },
    });
  }
  async deletePost(id: number) {
    return this.prismaService.client.post.delete({
      where: { id },
    });
  }
}
