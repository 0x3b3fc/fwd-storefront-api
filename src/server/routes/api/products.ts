import express from "express";
import authenticate from "../../../middleware/auth";
import ProductHandler from "../../../handler/product";

const products: express.Router = express.Router();
const productHandler = new ProductHandler();

products.get("/", (req, res) => {
  productHandler.index(req, res);
});

products.get("/:id", (req, res) => {
  productHandler.show(req, res);
});

products.post("/", authenticate, (req, res) => {
  productHandler.create(req, res);
});

products.put("/:id", authenticate, (req, res) => {
  productHandler.edit(req, res);
});

products.delete("/:id", authenticate, (req, res) => {
  productHandler.delete(req, res);
});

export default products;
