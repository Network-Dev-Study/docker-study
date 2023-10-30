import { inject, injectable } from 'inversify';
import TYPES from '../constant/types';
import { RequestCreateBoard, RequestDeleteBoard, RequestSearchBoards, RequestUpdateBoard } from '../models/board.model';
import { QueryInfo } from '../models/transaction.model';
import { BoardQuery, BoardQueryId } from '../query/board.query';
import DBConnectionFactory from '../utils/dbConnectionFactory.util';
import BaseMysqlRepository from './baseMysql.repository';
import BoardRepositoryInterface from './board.repository.inerface';

@injectable()
class BoardRepository extends BaseMysqlRepository implements BoardRepositoryInterface {
  constructor(@inject(TYPES.mysqlPool) protected mysqlPool: DBConnectionFactory) {
    super(mysqlPool);
  }

  public async getBoards<T>(request: RequestSearchBoards, connection?: any): Promise<T[]> {
    const queryInfo: QueryInfo = BoardQuery(BoardQueryId.getBoards, request);
    return await this.query(queryInfo.queryStr, queryInfo.queryParams, connection);
  }

  public async getBoard<T>(request: number, connection?: any): Promise<T> {
    const queryInfo: QueryInfo = BoardQuery(BoardQueryId.getBoard, request);
    const rows = await this.query(queryInfo.queryStr, queryInfo.queryParams, connection);

    let result: T;
    if (rows && rows.length > 0) {
      result = rows[0] as T;
    }

    return result;
  }

  public async createBoard<T>(request: RequestCreateBoard, connection?: any): Promise<T> {
    const queryInfo: QueryInfo = BoardQuery(BoardQueryId.createBoard, request);
    return await this.execute(queryInfo.queryStr, queryInfo.queryParams, connection);
  }

  public async updateBoard<T>(request: RequestUpdateBoard, connection?: any): Promise<T> {
    const queryInfo: QueryInfo = BoardQuery(BoardQueryId.updateBoard, request);
    return await this.execute(queryInfo.queryStr, queryInfo.queryParams, connection);
  }

  public async deleteBoard<T>(request: RequestDeleteBoard, connection?: any): Promise<T> {
    const queryInfo: QueryInfo = BoardQuery(BoardQueryId.deleteBoard, request);
    return await this.execute(queryInfo.queryStr, queryInfo.queryParams, connection);
  }
}

export default BoardRepository;
