import Client from "../database";
import { QueryResult } from "pg";

export abstract class ModelStoreBase<ModelType> {
  protected table: string;

  protected constructor(table: string) {
    this.table = table;
  }

  protected async runQuery(
    sql: string,
    params?: (string | number | undefined)[]
  ): Promise<QueryResult<ModelType>> {
    try {
      const conn = await Client.connect();
      let result: QueryResult<ModelType>;
      if (params) {
        result = await conn.query(sql, params);
      } else {
        result = await conn.query(sql);
      }
      conn.release();

      return result;
    } catch (error) {
      throw new Error(`Can not run query: ${error}`);
    }
  }

  async index(): Promise<ModelType[]> {
    try {
      const result: QueryResult<ModelType> = await this.runQuery(
        `SELECT * FROM ${this.table}`
      );
      return result.rows;
    } catch (error) {
      throw new Error(`Can not run index query on ${this.table}: ${error}`);
    }
  }

  async show(id: string): Promise<ModelType | ModelType[]> {
    try {
      const result: QueryResult<ModelType> = await this.runQuery(
        `SELECT * FROM ${this.table} WHERE id=($1)`,
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Can not run show query on ${this.table} for id ${id}: ${error}`
      );
    }
  }

  abstract create(type: ModelType): Promise<ModelType>;

  abstract edit(order: ModelType): Promise<ModelType>;

  async delete(id: string): Promise<ModelType> {
    try {
      const result: QueryResult<ModelType> = await this.runQuery(
        `DELETE FROM ${this.table} WHERE id=($1)`,
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Can not run delete query on ${this.table} for id ${id}: ${error}`
      );
    }
  }

  async deleteAll(): Promise<void> {
    try {
      await this.runQuery(`DELETE FROM ${this.table}`);
    } catch (error) {
      throw new Error(
        `Can not delete all entries in ${this.table}: ${error}`
      );
    }
  }
}
