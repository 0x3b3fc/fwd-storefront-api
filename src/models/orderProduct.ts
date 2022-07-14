import { ModelStoreBase } from "./modelBase";
import { QueryResult } from "pg";

export type OrderProduct = {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export class OrderProductStore extends ModelStoreBase<OrderProduct> {
  constructor() {
    super("order_products");
  }

  async create(product: OrderProduct): Promise<OrderProduct> {
    try {
      const result: QueryResult = await this.runQuery(
        `INSERT INTO ${this.table} (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *`,
        [product.order_id, product.product_id, product.quantity]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Can not run create query on ${this.table}: ${error}`);
    }
  }

  async edit(product: OrderProduct): Promise<OrderProduct> {
    try {
      const result: QueryResult = await this.runQuery(
        `UPDATE ${this.table} SET order_id = $2, product_id = $3, quantity = $4 WHERE id=$1 RETURNING *`,
        [product.id, product.order_id, product.product_id, product.quantity]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Can not run edit query on ${this.table}: ${error}`);
    }
  }
}
