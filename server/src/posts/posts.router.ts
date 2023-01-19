import { Router } from "express";
import { inject, injectable } from "inversify";

import { TYPES } from "./../shared/constants";
import { IMiddleware } from "./../shared/types";
import { IPostsController } from "./posts.controller";

enum POSTS_ROUTE {
  createPost = "/create",
  updatePost = "/update",
  deletePost = "/delete/:id",
  posts = "/",
  myPosts = "/my-posts",
  postById = "/:id",
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
      POSTS_ROUTE.createPost,
      this.usersAuthMiddleware.execute,
      this.postsController.createPost
    );
    this._router.get(POSTS_ROUTE.posts, this.postsController.getPosts);
    this._router.get(
      POSTS_ROUTE.myPosts,
      this.usersAuthMiddleware.execute,
      this.postsController.getMyPosts
    );
    this._router.get(POSTS_ROUTE.postById, this.postsController.getPostById);
    this._router.put(POSTS_ROUTE.updatePost, this.postsController.updatePost);
    this._router.put(
      POSTS_ROUTE.myPosts,
      this.usersAuthMiddleware.execute,
      this.postsController.getMyPosts
    );
    this._router.delete(POSTS_ROUTE.deletePost, this.postsController.deletePost);
  }

  get router() {
    return this._router;
  }
}
