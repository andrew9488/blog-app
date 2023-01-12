import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";

export interface IPrismaService {
  client: PrismaClient;
  connect: () => void;
  disconnect: () => void;
}

@injectable()
export class PrismaService implements IPrismaService {
  _client: PrismaClient;

  constructor() {
    this._client = new PrismaClient();
  }

  async connect() {
    try {
      await this._client.$connect();
      console.log(`[PrismaService] was successfully connected to db`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`[PrismaService] ${error.message}`);
      }
    }
  }
  async disconnect() {
    await this._client.$disconnect();
  }
  get client() {
    return this._client;
  }
}
