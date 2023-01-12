import { Request, Response, NextFunction } from "express";
import { injectable } from "inversify";
import { verify } from "jsonwebtoken";

import { IMiddleware } from "../shared/types";

@injectable()
export class UsersAuthMiddleware implements IMiddleware {
  constructor() {
    this.execute = this.execute.bind(this);
  }

  execute(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1] as string;
      verify(token, process.env.JWT_SECRET || "secret", (error, payload) => {
        if (error) {
          next();
        } else if (typeof payload === "object") {
          req.userId = payload.id;
          next();
        }
      });
    } else {
      next();
    }
  }
}
