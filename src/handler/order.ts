import { HandlersBase } from "./handlersBase";
import { Request, Response } from "express";
import { Order, OrderStore } from "../models/order";

export default class OrderHandler extends HandlersBase<Order, OrderStore> {
  constructor() {
    super(OrderStore);
  }

  override async show(req: Request, res: Response): Promise<void> {
    try {
      await this.handleRequest(
        false,
        req,
        res,
        async (req: Request): Promise<Order[] | Order> => {
          return await this.store.show(req.params.user_id);
        }
      );
    } catch (error) {
      throw new Error(`Could not handle show: ${error}`);
    }
  }

  override async create(req: Request, res: Response): Promise<void> {
    try {
      await this.handleRequest(
        false,
        req,
        res,
        async (req: Request): Promise<Order> => {
          return await this.store.create({
            user_id: req.body.user_id,
            status: req.body.status ?? "active",
          });
        }
      );
    } catch (error) {
      throw new Error(`Could not handle create: ${error}`);
    }
  }

  override async edit(req: Request, res: Response): Promise<void> {
    try {
      await this.handleRequest(
        false,
        req,
        res,
        async (req: Request): Promise<Order> => {
          return await this.store.edit({
            id: parseInt(req.params.id),
            user_id: req.body.user_id,
            status: req.body.status ?? "active",
          });
        }
      );
    } catch (error) {
      throw new Error(`Could not handle edit: ${error}`);
    }
  }
}
