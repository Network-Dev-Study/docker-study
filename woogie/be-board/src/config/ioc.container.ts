import { Container } from 'inversify';
import TYPES from '../constant/types';
import BoardRepository from '../repository/board.repository';
import BoardRepositoryInterface from '../repository/board.repository.inerface';
import BoardService from '../services/board.service';
import DBConnectionFactory from '../utils/dbConnectionFactory.util';

const container = new Container();

container.bind<DBConnectionFactory>(TYPES.mysqlPool).to(DBConnectionFactory);

container.bind<BoardRepositoryInterface>(TYPES.BoardRepositoryInterface).to(BoardRepository);
container.bind<BoardService>(TYPES.BoardService).to(BoardService);

export default container;
