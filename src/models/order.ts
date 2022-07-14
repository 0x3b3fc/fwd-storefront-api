import { ModelStoreBase } from "./modelBase";
import { QueryResult } from "pg";

export type Order = {
  id?: number;
  user_id: number;
  status: string;
};

export class OrderStore extends ModelStoreBase<Order> {
  constructor() {
    super("orders");
  }

  async show(id: string): Promise<Order[]> {
    try {
      id = `${id}`;
      const result: QueryResult = await this.runQuery(
        `SELECT * FROM ${this.table} WHERE user_id=($1) AND status<>($2)`,
        [id, "complete"]
      );
      return result.rows;
    } catch (error) {
      throw new Error(`Can not run show query on ${this.table}: ${error}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const result: QueryResult = await this.runQuery(
        `INSERT INTO ${this.table} (user_id, status) VALUES($1, $2) RETURNING *`,
        [order.user_id, order.status]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Can not run create query on ${this.table}: ${error}`);
    }
  }

  async edit(order: Order): Promise<Order> {
    try {
      const result: QueryResult = await this.runQuery(
        `UPDATE ${this.table} SET user_id = $2, status = $3 WHERE id=$1 RETURNING *`,
        [order.id, order.user_id, order.status]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Can not run edit query on ${this.table}: ${error}`);
    }
  }
}
