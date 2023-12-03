import 'reflect-metadata';
import * as cors from 'cors';
import * as express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import container from './config/ioc.container';
import './controller/home.controller';
import './controller/board.controller';
import './controller/health.controller';

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(cors({ origin: true }));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
});

const app = server.build();
const port = 4002;

app.listen(port, () => {
  console.log(`✅ Listening on: http://localhost:${port}`);
});
