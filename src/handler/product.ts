import { HandlersBase } from "./handlersBase";
import { Request, Response } from "express";
import { Product, ProductStore } from "../models/product";

export default class ProductHandler extends HandlersBase<Product, ProductStore> {
  constructor() {
    super(ProductStore);
  }

  override async create(req: Request, res: Response): Promise<void> {
    try {
      await this.handleRequest(
        false,
        req,
        res,
        async (req: Request): Promise<Product> => {
          return await this.store.create({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category ?? "",
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
        async (req: Request): Promise<Product> => {
          return await this.store.edit({
            id: parseInt(req.params.id),
            name: req.body.name,
            price: req.body.price,
            category: req.body.category ?? "",
          });
        }
      );
    } catch (error) {
      throw new Error(`Can not handle edit: ${error}`);
    }
  }
}
