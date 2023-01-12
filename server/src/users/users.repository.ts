import { inject, injectable } from "inversify";
import { User } from "@prisma/client";

import { TYPES } from "./../shared/constants";
import { IPrismaService } from "./../database/prisma.service";

export interface IUsersRepository {
  create: (user: any) => Promise<User>;
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
  }

  async create({ username, password }: User) {
    return this.prismaService.client.user.create({
      data: {
        posts: {},
        username,
        password,
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
