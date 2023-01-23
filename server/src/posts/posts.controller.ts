import { inject, injectable } from "inversify";
import { Request, Response } from "express";

import { IPostsRepository } from "./posts.repository";
import { TYPES } from "./../shared/constants";
import { errorHandler } from "../shared/error.helper";
import { IUsersRepository } from "../users/users.repository";

export interface IPostsController {
  createPost: (req: Request, res: Response) => Promise<void>;
  updatePost: (req: Request, res: Response) => Promise<void>;
  deletePost: (req: Request, res: Response) => Promise<void>;
  getPosts: (req: Request, res: Response) => Promise<void>;
  getMyPosts: (req: Request, res: Response) => Promise<void>;
  getPostById: (req: Request, res: Response) => Promise<void>;
}

@injectable()
export class PostsController implements IPostsController {
  @inject(TYPES.UsersRepository) private usersRepository: IUsersRepository;
  @inject(TYPES.PostsRepository) private postsRepository: IPostsRepository;
  constructor() {
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.getMyPosts = this.getMyPosts.bind(this);
    this.getPostById = this.getPostById.bind(this);
  }

  async createPost(req: Request, res: Response) {
    try {
      const { title, content } = req.body;
      const user = await this.usersRepository.findById(req.userId);
      const newPost = await this.postsRepository.createPost({
        authorId: user?.id as number,
        content,
        title,
      });
      res.status(201).json({ newPost });
    } catch (error) {
      this.httpError(res, error);
    }
  }

  async updatePost(req: Request, res: Response) {
    const { id, ...rest } = req.body;
    await this.postsRepository.updatePost(id, { ...rest });
    res.status(204).json({ message: "Post was successfully updated" });
    try {
    } catch (error) {
      this.httpError(res, error);
    }
  }

  async deletePost(req: Request, res: Response) {
    const { id } = req.params;
    await this.postsRepository.deletePost(Number(id));
    res.status(204).json({ message: "Post was successfully deleted" });
    try {
    } catch (error) {
      this.httpError(res, error);
    }
  }

  async getPosts(req: Request, res: Response) {
    try {
      const posts = await this.postsRepository.getAllPosts();
      const popularPosts = await this.postsRepository.getPopularPosts();
      res.status(200).json({ posts, popularPosts });
    } catch (error) {
      this.httpError(res, error);
    }
  }

  private httpError(res: Response, err: unknown, statusCode = 400) {
    const error = errorHandler(err);
    res.status(statusCode).json({ message: error });
  }

  async getMyPosts(req: Request, res: Response) {
    try {
      const myPosts = await this.postsRepository.getMyPosts(req.userId);
      res.status(200).json({ myPosts });
    } catch (error) {
      this.httpError(res, error);
    }
  }

  async getPostById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const post = await this.postsRepository.getPostById(Number(id));
      res.status(200).json({ post });
    } catch (error) {
      this.httpError(res, error);
    }
  }
}
