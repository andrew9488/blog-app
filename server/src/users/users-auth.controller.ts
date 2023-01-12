import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";

import { IUsersRepository } from "./users.repository";
import { TYPES } from "./../shared/constants";
import { errorHandler } from "../shared/error.helper";

export interface IUsersAuthController {
  login: (req: Request, res: Response) => Promise<void>;
  register: (req: Request, res: Response) => Promise<void>;
  getMe: (req: Request, res: Response) => Promise<void>;
}

@injectable()
export class UsersAuthController implements IUsersAuthController {
  @inject(TYPES.UsersRepository) private usersRepository: IUsersRepository;

  constructor() {
    this.getMe = this.getMe.bind(this);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async register(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const existedUser = await this.usersRepository.findByName(username);
      if (existedUser) {
        res.status(402).json({
          message: `This name '${username}' is already booked, please chose another one`,
        });
      } else {
        const hashedPassword = await hash(password, 10);
        await this.usersRepository.create({
          username,
          password: hashedPassword,
        });
        res.status(201).json("You were successfully registered");
      }
    } catch (error) {
      this.httpError(res, error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await this.usersRepository.findByName(username);
      if (!user) {
        res.status(403).json({
          message: `Wrong login or password`,
        });
        return;
      }
      const isPasswordCorrect = await compare(password, user.password);
      if (!isPasswordCorrect) {
        res.status(403).json({
          message: `Wrong password`,
        });
        return;
      }
      const token = this.createToken(user.id);
      res.status(200).json({ token, existedUser: user });
    } catch (error) {
      this.httpError(res, error);
    }
  }

  async getMe(req: Request, res: Response) {
    try {
      const user = await this.usersRepository.findById(req.userId);
      if (!user) {
        res.status(401).json({
          message: "You are not authorized",
        });
        return;
      }
      const token = this.createToken(user.id);
      res.status(201).json({ token, user });
    } catch (error) {
      this.httpError(res, error);
    }
  }

  private createToken(id: number) {
    return jwt.sign(
      {
        id,
      },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "30d" }
    );
  }

  private httpError(res: Response, err: unknown, statusCode = 400) {
    const error = errorHandler(err);
    res.status(statusCode).json({ message: error });
  }
}
