import express, { Express } from "express";
import { Server } from "http";
import { inject, injectable } from "inversify";
import dotenv from "dotenv";
import { json, urlencoded } from "body-parser";
import cors from "cors";

import { TYPES } from "./shared/constants";
import { IPrismaService } from "./database/prisma.service";
import { IUsersAuthRouter } from "./users/users-auth.router";
import { ICommentsRouter } from "./comments/comments.router";
import { IPostsRouter } from "./posts/posts.router";
export interface IApp {
  init: () => void;
}

@injectable()
export class App implements IApp {
  private port: number;
  private server: Server;
  private app: Express;

  @inject(TYPES.PrismaService) private prismaService: IPrismaService;
  @inject(TYPES.UsersAuthRouter) private usersAuthRouter: IUsersAuthRouter;
  @inject(TYPES.PostsRouter) private postsRouter: IPostsRouter;
  @inject(TYPES.CommentsRouter) private commentsRouter: ICommentsRouter;

  constructor() {
    dotenv.config();
    this.port = Number(process.env.PORT) || 7000;
    this.app = express();
  }

  private useRoutes() {
    this.app.use("/api/users", this.usersAuthRouter.router);
    this.app.use("/api/posts", this.postsRouter.router);
    this.app.use("/api/comments", this.commentsRouter.router);
  }

  public async init() {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.useRoutes();
    await this.prismaService.connect();
    this.server = this.app.listen(this.port);
    console.log(`Example app listening on port ${this.port}`);
  }
}
