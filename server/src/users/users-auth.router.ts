import { Router } from "express";
import { inject, injectable } from "inversify";

import { IUsersAuthController } from "./users-auth.controller";
import { TYPES } from "./../shared/constants";
import { IMiddleware } from "./../shared/types";

enum AUTH_ROUTE {
  register = "/register",
  login = "/login",
  authMe = "/me",
}

export interface IUsersAuthRouter {
  router: Router;
}

@injectable()
export class UsersAuthRouter implements IUsersAuthRouter {
  private _router: Router;

  constructor(
    @inject(TYPES.UsersAuthController)
    private usersAuthController: IUsersAuthController,
    @inject(TYPES.UsersAuthMiddleware)
    private usersAuthMiddleware: IMiddleware
  ) {
    this._router = Router();
    this._router.post(AUTH_ROUTE.register, this.usersAuthController.register);
    this._router.post(AUTH_ROUTE.login, this.usersAuthController.login);
    this._router.get(
      AUTH_ROUTE.authMe,
      this.usersAuthMiddleware.execute,
      this.usersAuthController.getMe
    );
  }

  get router() {
    return this._router;
  }
}
