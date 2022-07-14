import { HandlersBase } from "./handlersBase";
import { Request, Response } from "express";
import { User, UserStore } from "../models/user";

export default class UserHandler extends HandlersBase<User, UserStore> {
  constructor() {
    super(UserStore);
  }

  override async create(req: Request, res: Response): Promise<void> {
    try {
      await this.handleRequest(
        true,
        req,
        res,
        async (req: Request): Promise<User> => {
          return await this.store.create({
            user_name: req.body.user_name,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
          });
        }
      );
    } catch (error) {
      throw new Error(`Can not handle create: ${error}`);
    }
  }

  override async edit(req: Request, res: Response): Promise<void> {
    try {
      await this.handleRequest(
        false,
        req,
        res,
        async (req: Request): Promise<User> => {
          return await this.store.edit({
            id: parseInt(req.params.id),
            user_name: req.body.user_name,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
          });
        }
      );
    } catch (error) {
      throw new Error(`Can not handle edit: ${error}`);
    }
  }

  async authenticate(req: Request, res: Response): Promise<void> {
    try {
      await this.handleRequest(
        true,
        req,
        res,
        async (req: Request): Promise<User | null> => {
          return await this.store.authenticate(
            req.body.user_name,
            req.body.password
          );
        }
      );
    } catch (error) {
      throw new Error(`Can not handle authenticate: ${error}`);
    }
  }
}
