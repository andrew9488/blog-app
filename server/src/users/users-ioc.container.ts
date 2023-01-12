import { ContainerModule, interfaces } from "inversify";

import { IUsersRepository, UsersRepository } from "./users.repository";
import { UsersAuthMiddleware } from "./users-auth.middleware";
import {
  IUsersAuthController,
  UsersAuthController,
} from "./users-auth.controller";
import { IUsersAuthRouter, UsersAuthRouter } from "./users-auth.router";
import { TYPES } from "../shared/constants";
import { IMiddleware } from "../shared/types";

export const usersContainer = new ContainerModule(
  (
    bind: interfaces.Bind,
    unbind: interfaces.Unbind,
    isBound: interfaces.IsBound,
    rebind: interfaces.Rebind,
    unbindAsync: interfaces.UnbindAsync,
    onActivation: interfaces.Container["onActivation"],
    onDeactivation: interfaces.Container["onDeactivation"]
  ) => {
    bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository);
    bind<IMiddleware>(TYPES.UsersAuthMiddleware).to(UsersAuthMiddleware);
    bind<IUsersAuthController>(TYPES.UsersAuthController).to(
      UsersAuthController
    );
    bind<IUsersAuthRouter>(TYPES.UsersAuthRouter).to(UsersAuthRouter);
  }
);
