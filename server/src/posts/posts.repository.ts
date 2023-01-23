import { Post } from "@prisma/client";
import { inject, injectable } from "inversify";

import { IPrismaService } from "../database/prisma.service";
import { TYPES } from "../shared/constants";

type CreatePostData = {
  title: string;
  content: string;
  authorId: number;
};

type UpdatePostData = Omit<CreatePostData, "authorId"> & { views: number };

export interface IPostsRepository {
  createPost: (data: CreatePostData) => Promise<Post>;
  updatePost: (id: number, data: UpdatePostData) => Promise<Post>;
  deletePost: (id: number) => Promise<Post>;
  getAllPosts: () => Promise<Post[]>;
  getPopularPosts: () => Promise<Post[]>;
  getMyPosts: (
    id: number
  ) => Promise<Pick<Post, "id" | "createdAt" | "title">[]>;
  getPostById: (id: number) => Promise<Post | null>;
}

@injectable()
export class PostsRepository implements IPostsRepository {
  @inject(TYPES.PrismaService) private prismaService: IPrismaService;

  constructor() {
    this.createPost = this.createPost.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.getAllPosts = this.getAllPosts.bind(this);
    this.getPopularPosts = this.getPopularPosts.bind(this);
    this.getMyPosts = this.getMyPosts.bind(this);
    this.getPostById = this.getPostById.bind(this);
  }
  async createPost({ title, content, authorId }: CreatePostData) {
    return this.prismaService.client.post.create({
      data: {
        title,
        content,
        authorId,
        createdAt: new Date(),
      },
    });
  }
  async updatePost(id: number, { title, content, views }: UpdatePostData) {
    return this.prismaService.client.post.update({
      where: { id },
      data: { title, content, views },
    });
  }
  async deletePost(id: number) {
    return this.prismaService.client.post.delete({
      where: { id },
    });
  }

  async getAllPosts() {
    return this.prismaService.client.post.findMany({
      include: {
        author: true,
        comments: true,
      },
    });
  }

  async getPopularPosts() {
    return this.prismaService.client.post.findMany({
      take: 10,
      where: {
        views: {
          gte: 5,
        },
        createdAt: {
          gte: new Date("2023-01-01T00:00:00+0200"),
        },
      },
      include: {
        author: true,
        comments: true,
      },
    });
  }

  async getMyPosts(authorId: number) {
    return this.prismaService.client.post.findMany({
      where: {
        authorId,
      },
      select: {
        title: true,
        createdAt: true,
        id: true,
      },
    });
  }

  async getPostById(id: number) {
    return this.prismaService.client.post.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
        comments: true,
      },
    });
  }
}
