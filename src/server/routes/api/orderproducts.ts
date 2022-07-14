import express from "express";
import authenticate from "../../../middleware/auth";
import OrderProductHandler from "../../../handler/orderProduct";

const orderProducts: express.Router = express.Router();
const orderProductHandler = new OrderProductHandler();

orderProducts.get("/", authenticate, (req, res) => {
  orderProductHandler.index(req, res);
});

orderProducts.get("/:id", authenticate, (req, res) => {
  orderProductHandler.show(req, res);
});

orderProducts.post("/", authenticate, (req, res) => {
  orderProductHandler.create(req, res);
});

orderProducts.put("/:id", authenticate, (req, res) => {
  orderProductHandler.edit(req, res);
});

orderProducts.delete("/:id", authenticate, (req, res) => {
  orderProductHandler.delete(req, res);
});

export default orderProducts;
