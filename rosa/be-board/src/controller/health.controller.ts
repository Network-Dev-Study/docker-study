import * as express from 'express';
import { controller, httpGet, request, response } from 'inversify-express-utils';

@controller('/health')
class HealthController {
  constructor() {}

  @httpGet('/')
  public async getHealth(@request() req: express.Request, @response() res: express.Response) {
    return res.status(200).json({ status: 'ok' });
  }
}

export default HealthController;
