import * as express from 'express';
import { controller, httpGet, request, response } from 'inversify-express-utils';
import DBConnectionFactory from '../utils/dbConnectionFactory.util';

@controller('/health')
class HealthController {
  private mysqlPool = new DBConnectionFactory();

  @httpGet('/')
  public async getHealth(@request() req: express.Request, @response() res: express.Response) {
    const connection = await this.mysqlPool.getConnection();
    const [rows, fields] = await connection.query('SELECT TRUE as healthy FROM DUAL');
    return rows[0];
  }
}

export default HealthController;
