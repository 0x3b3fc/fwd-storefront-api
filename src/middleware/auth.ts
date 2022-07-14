import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const authorizationHeader = req.headers.authorization as unknown as string;
    const split = authorizationHeader.split(" ");
    const token = split.length > 1 ? split[1] : authorizationHeader;

    jwt.verify(token, process.env.TOKEN_SECRET as unknown as string);

    next();
  } catch (error) {
    res.status(401).send();
  }
}
