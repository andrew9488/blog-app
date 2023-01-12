import { Container } from "inversify";
import "reflect-metadata";

import { App, IApp } from "./app";
import { TYPES } from "./shared/constants";

import { IPrismaService, PrismaService } from "./database/prisma.service";
import { usersContainer } from "./users/users-ioc.container";

function bootstrap() {
  const container = new Container();
  container.bind<IApp>(TYPES.App).to(App);
  container
    .bind<IPrismaService>(TYPES.PrismaService)
    .to(PrismaService)
    .inSingletonScope();
  container.load(usersContainer);
  const app = container.get<IApp>(TYPES.App);
  app.init();
  return { container, app };
}

export const { container, app } = bootstrap();
