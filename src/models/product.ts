import { ModelStoreBase } from "./modelBase";
import { QueryResult } from "pg";

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class ProductStore extends ModelStoreBase<Product> {
  constructor() {
    super("products");
  }

  async create(product: Product): Promise<Product> {
    try {
      const result: QueryResult = await this.runQuery(
        `INSERT INTO ${this.table} (name, price, category) VALUES($1, $2, $3) RETURNING *`,
        [product.name, product.price, product.category]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Can not run create query on ${this.table}: ${error}`);
    }
  }

  async edit(product: Product): Promise<Product> {
    try {
      const result: QueryResult = await this.runQuery(
        `UPDATE ${this.table} SET name = $2, price = $3, category = $4 WHERE id=$1 RETURNING *`,
        [product.id, product.name, product.price, product.category]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Can not run edit query on ${this.table}: ${error}`);
    }
  }
}
