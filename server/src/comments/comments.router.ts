import { ICommentsController } from "./comments.controller";
import { Router } from "express";
import { inject, injectable } from "inversify";

import { TYPES } from "./../shared/constants";

enum COMMENTS_ROUTE {
  createComment = "/create",
  deleteComment = "/delete/:id",
}

export interface ICommentsRouter {
  router: Router;
}

@injectable()
export class CommentsRouter implements ICommentsRouter {
  private _router: Router;

  constructor(
    @inject(TYPES.CommentsController)
    private commentsController: ICommentsController
  ) {
    this._router = Router();
    this._router.post(
      COMMENTS_ROUTE.createComment,
      this.commentsController.createComment
    );
    this._router.delete(
      COMMENTS_ROUTE.deleteComment,
      this.commentsController.deleteComment
    );
  }

  get router() {
    return this._router;
  }
}
