import { IPostsRepository } from "./posts.repository";
import { inject, injectable } from "inversify";
import { Request, Response } from "express";

import { TYPES } from "./../shared/constants";
import { errorHandler } from "../shared/error.helper";
import { IUsersRepository } from "../users/users.repository";

export interface IPostsController {
  createPost: (req: Request, res: Response) => Promise<void>;
  updatePost: (req: Request, res: Response) => Promise<void>;
  deletePost: (req: Request, res: Response) => Promise<void>;
}

@injectable()
export class PostsController implements IPostsController {
  @inject(TYPES.UsersRepository) private usersRepository: IUsersRepository;
  @inject(TYPES.PostsRepository) private postsRepository: IPostsRepository;
  constructor() {
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
    this.updatePost = this.updatePost.bind(this);
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
      await this.usersRepository.update(req.userId, { ...newPost });
      res.status(200).json({ newPost });
    } catch (error) {
      this.httpError(res, error);
    }
  }

  async updatePost(req: Request, res: Response) {
    try {
    } catch (error) {
      this.httpError(res, error);
    }
  }

  async deletePost(req: Request, res: Response) {
    try {
    } catch (error) {
      this.httpError(res, error);
    }
  }

  private httpError(res: Response, err: unknown, statusCode = 400) {
    const error = errorHandler(err);
    res.status(statusCode).json({ message: error });
  }
}
