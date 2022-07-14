import ServerCreator from "./serverCreator";
import express from "express";

export default class ServerBase {
  public app;
  public port: number;

  constructor(port: number) {
    this.app = ServerCreator.getInstance().getServer(port);
    this.port = port;
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  public startListening(): void {
    ServerCreator.getInstance().startListening(this.port);
  }
}
