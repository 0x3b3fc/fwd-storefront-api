import express from "express";
import authenticate from "../../../middleware/auth";
import OrderHandler from "../../../handler/order";

const orders: express.Router = express.Router();
const orderHandler = new OrderHandler();

orders.get("/", authenticate, (req, res) => {
  orderHandler.index(req, res);
});

orders.get("/:user_id", authenticate, (req, res) => {
  orderHandler.show(req, res);
});

orders.post("/", authenticate, (req, res) => {
  orderHandler.create(req, res);
});

orders.put("/:id", authenticate, (req, res) => {
  orderHandler.edit(req, res);
});

orders.delete("/:id", authenticate, (req, res) => {
  orderHandler.delete(req, res);
});

export default orders;
