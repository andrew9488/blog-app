import { Router } from "express";
import { inject, injectable } from "inversify";

import { TYPES } from "./../shared/constants";
import { IMiddleware } from "./../shared/types";
import { IPostsController } from "./posts.controller";

enum POSTS_ROUTE {
  create = "/create",
  update = "/update",
  delete = "/delete",
}

export interface IPostsRouter {
  router: Router;
}

@injectable()
export class PostsRouter implements IPostsRouter {
  private _router: Router;

  constructor(
    @inject(TYPES.PostsController)
    private postsController: IPostsController,
    @inject(TYPES.UsersAuthMiddleware)
    private usersAuthMiddleware: IMiddleware
  ) {
    this._router = Router();
    this._router.post(
      POSTS_ROUTE.create,
      this.usersAuthMiddleware.execute,
      this.postsController.createPost
    );
  }

  get router() {
    return this._router;
  }
}
