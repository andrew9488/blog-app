import { inject, injectable } from "inversify";
import { Request, Response } from "express";

import { ICommentsRepository } from "./comments.repository";
import { TYPES } from "./../shared/constants";
import { errorHandler } from "../shared/error.helper";

export interface ICommentsController {
  createComment: (req: Request, res: Response) => Promise<void>;
  deleteComment: (req: Request, res: Response) => Promise<void>;
}

@injectable()
export class CommentsController implements ICommentsController {
  @inject(TYPES.CommentsRepository)
  private commentsRepository: ICommentsRepository;

  constructor() {
    this.createComment = this.createComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.httpError = this.httpError.bind(this);
  }

  async createComment(req: Request, res: Response) {
    try {
      const { postId, content } = req.body;
      const newComment = await this.commentsRepository.createComment({
        content,
        postId,
      });
      res.status(201).json({ newComment });
    } catch (error) {
      this.httpError(res, error);
    }
  }
  async deleteComment(req: Request, res: Response) {
    const { id } = req.params;
    await this.commentsRepository.deleteComment(Number(id));
    res.status(204).json({ message: "Post was successfully deleted" });
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
