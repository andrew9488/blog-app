import { ContainerModule, interfaces } from "inversify";

import { TYPES } from "../shared/constants";
import { IMiddleware } from "../shared/types";
import { IPostsRepository, PostsRepository } from "./posts.repository";
import { IPostsRouter, PostsRouter } from "./posts.router";
import { IPostsController, PostsController } from "./posts.controller";

export const postsContainer = new ContainerModule(
  (
    bind: interfaces.Bind,
    unbind: interfaces.Unbind,
    isBound: interfaces.IsBound,
    rebind: interfaces.Rebind,
    unbindAsync: interfaces.UnbindAsync,
    onActivation: interfaces.Container["onActivation"],
    onDeactivation: interfaces.Container["onDeactivation"]
  ) => {
    bind<IPostsRepository>(TYPES.PostsRepository).to(PostsRepository);
    bind<IPostsRouter>(TYPES.PostsRouter).to(PostsRouter);
    bind<IPostsController>(TYPES.PostsController).to(PostsController);
  }
);
