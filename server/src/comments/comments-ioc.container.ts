import { ContainerModule, interfaces } from "inversify";

import { TYPES } from "../shared/constants";
import { CommentsController, ICommentsController } from "./comments.controller";
import { CommentsRepository, ICommentsRepository } from "./comments.repository";
import { CommentsRouter, ICommentsRouter } from "./comments.router";

export const commentsContainer = new ContainerModule(
  (
    bind: interfaces.Bind,
    unbind: interfaces.Unbind,
    isBound: interfaces.IsBound,
    rebind: interfaces.Rebind,
    unbindAsync: interfaces.UnbindAsync,
    onActivation: interfaces.Container["onActivation"],
    onDeactivation: interfaces.Container["onDeactivation"]
  ) => {
    bind<ICommentsRepository>(TYPES.CommentsRepository).to(CommentsRepository);
    bind<ICommentsRouter>(TYPES.CommentsRouter).to(CommentsRouter);
    bind<ICommentsController>(TYPES.CommentsController).to(CommentsController);
  }
);
