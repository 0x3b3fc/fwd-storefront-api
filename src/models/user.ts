import { ModelStoreBase } from "./modelBase";
import { QueryResult } from "pg";
import bcrypt from "bcrypt";

export type User = {
  id?: number;
  user_name: string;
  first_name: string;
  last_name: string;
  password: string;
};

export class UserStore extends ModelStoreBase<User> {
  private saltRounds: number = parseInt(
    process.env.SALT_ROUNDS as unknown as string
  );
  private pepper: string = process.env.BCRYPT_PASSWORD as unknown as string;

  constructor() {
    super("users");
  }

  async create(user: User): Promise<User> {
    const hash = bcrypt.hashSync(user.password + this.pepper, this.saltRounds);
    try {
      const result: QueryResult = await this.runQuery(
        `INSERT INTO ${this.table} (user_name, first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING *`,
        [user.user_name, user.first_name, user.last_name, hash]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Can not run create query on ${this.table}: ${error}`);
    }
  }

  async edit(user: User): Promise<User> {
    const hash = bcrypt.hashSync(
      `${user.password}${this.pepper}`,
      this.saltRounds
    );

    try {
      const result: QueryResult = await this.runQuery(
        `UPDATE ${this.table} SET user_name = $2, first_name = $3, last_name = $4, password = $5 WHERE id=$1 RETURNING *`,
        [user.id, user.user_name, user.first_name, user.last_name, hash]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Can not run edit query on ${this.table}: ${error}`);
    }
  }

  async authenticate(
    user_name: string,
    password: string
  ): Promise<User | null> {
    let result: QueryResult | null;
    try {
      result = await this.runQuery(
        `SELECT * FROM ${this.table} WHERE user_name=($1)`,
        [user_name]
      );
    } catch (error) {
      result = null;
      throw new Error(`Can not run show query on ${this.table}: ${error}`);
    }

    if (!result?.rows.length) {
      return null;
    }

    const user = result.rows[0];
    if (!bcrypt.compareSync(`${password}${this.pepper}`, user.password)) {
      return null;
    }

    return user;
  }
}
