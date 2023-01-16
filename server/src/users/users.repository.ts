import { inject, injectable } from "inversify";
import { Post, User } from "@prisma/client";

import { TYPES } from "./../shared/constants";
import { IPrismaService } from "./../database/prisma.service";

export interface IUsersRepository {
  create: (user: Omit<User, "id">) => Promise<User>;
  update: (userId: number, post: Post) => Promise<User>;
  findByName: (username: string) => Promise<User | null>;
  findById: (userId: number) => Promise<User | null>;
}

@injectable()
export class UsersRepository implements IUsersRepository {
  @inject(TYPES.PrismaService) private prismaService: IPrismaService;

  constructor() {
    this.create = this.create.bind(this);
    this.findByName = this.findByName.bind(this);
    this.findById = this.findById.bind(this);
    this.update = this.update.bind(this);
  }

  async create({ username, password }: Omit<User, "id">) {
    return this.prismaService.client.user.create({
      data: {
        posts: { create: [] },
        username,
        password,
      },
    });
  }
  async update(userId: number, post: Post) {
    return this.prismaService.client.user.update({
      where: { id: userId },
      data: {
        posts: {
          upsert: [
            {
              create: { title: post.title, content: post.content },
              update: { title: post.title, content: post.content },
              where: { id: post.id },
            },
          ],
        },
      },
    });
  }

  async findByName(username: string) {
    return this.prismaService.client.user.findUnique({
      where: { username },
    });
  }

  async findById(userId: number) {
    return this.prismaService.client.user.findUnique({
      where: { id: userId },
    });
  }
}
