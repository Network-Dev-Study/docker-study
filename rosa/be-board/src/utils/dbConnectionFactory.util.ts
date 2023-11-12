import { injectable } from 'inversify';
import * as mysql from 'mysql2/promise';

@injectable()
class DBConnectionFactory {
  private static pool: mysql.Pool;
  private static instance: mysql.PoolConnection;

  public async getConnection(): Promise<mysql.PoolConnection> {
    const options: mysql.PoolOptions = {
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 5,
      multipleStatements: true,
    };

    try {
      if (!DBConnectionFactory.pool) {
        DBConnectionFactory.pool = mysql.createPool(options);
      }

      if (!DBConnectionFactory.instance) {
        DBConnectionFactory.instance = await DBConnectionFactory.pool.getConnection();
      }

      if (!DBConnectionFactory.instance.ping()) {
        DBConnectionFactory.instance = await DBConnectionFactory.pool.getConnection();
      }
    } catch (error) {
      throw error;
    }

    return DBConnectionFactory.instance;
  }
}

export default DBConnectionFactory;
