import express from "express";
import authenticate from "../../../middleware/auth";
import UserHandler from "../../../handler/user";

const users: express.Router = express.Router();
const userHandler = new UserHandler();

users.get("/", authenticate, (req, res) => {
  userHandler.index(req, res);
});

users.get("/:id", authenticate, (req, res) => {
  userHandler.show(req, res);
});

users.post("/", (req, res) => {
  userHandler.create(req, res);
});

users.put("/:id", authenticate, (req, res) => {
  userHandler.edit(req, res);
});

users.delete("/:id", authenticate, (req, res) => {
  userHandler.delete(req, res);
});

export default users;
