import { inject, injectable } from 'inversify';
import TYPES from '../constant/types';
import {
  RequestCreateBoard,
  RequestDeleteBoard,
  RequestGetBoard,
  RequestSearchBoards,
  RequestUpdateBoard,
} from '../models/board.model';
import { TransactionResult } from '../models/transaction.model';
import BoardRepository from '../repository/board.repository';
import DBConnectionFactory from '../utils/dbConnectionFactory.util';

@injectable()
class BoardService {
  constructor(
    @inject(TYPES.mysqlPool) private mysqlPool: DBConnectionFactory,
    @inject(TYPES.BoardRepositoryInterface) private repository: BoardRepository
  ) {}

  public async getBoards<T>(request: RequestSearchBoards): Promise<T[]> {
    let result: T[];
    let connection;

    try {
      connection = await this.mysqlPool.getConnection();
      connection.beginTransaction();

      result = await this.repository.getBoards(request, connection);
      connection && connection.commit();
    } catch (error) {
      connection && connection.rollback();
      throw error;
    } finally {
      connection && connection.release();
    }

    return result;
  }

  public async getBoard<T>(request: RequestGetBoard): Promise<T> {
    let result: T;
    let connection;

    try {
      connection = await this.mysqlPool.getConnection();
      connection.beginTransaction();

      result = await this.repository.getBoard(request, connection);
      connection && connection.commit();
    } catch (error) {
      connection && connection.rollback();
      throw error;
    } finally {
      connection && connection.release();
    }

    return result;
  }

  public async createBoard<T>(request: RequestCreateBoard): Promise<T> {
    let result: T;
    let connection;

    try {
      connection = await this.mysqlPool.getConnection();
      connection.beginTransaction();

      const { insertId: newPostId } = await this.repository.createBoard<TransactionResult>(request, connection);
      result = await this.repository.getBoard(newPostId, connection);
      connection && connection.commit();
    } catch (error) {
      connection && connection.rollback();
      throw error;
    } finally {
      connection && connection.release();
    }

    return result;
  }

  public async updateBoard<T>(request: RequestUpdateBoard): Promise<T> {
    let result: T;
    let connection;

    try {
      connection = await this.mysqlPool.getConnection();
      connection.beginTransaction();

      await this.repository.updateBoard(request, connection);
      result = await this.repository.getBoard(request.id, connection);
      connection && connection.commit();
    } catch (error) {
      connection && connection.rollback();
      throw error;
    } finally {
      connection && connection.release();
    }

    return result;
  }

  public async deleteBoard<T>(request: RequestDeleteBoard): Promise<T[]> {
    let result: T[];
    let connection;

    try {
      connection = await this.mysqlPool.getConnection();
      connection.beginTransaction();

      result = await this.repository.deleteBoard(request, connection);
      connection && connection.commit();
    } catch (error) {
      connection && connection.rollback();
      throw error;
    } finally {
      connection && connection.release();
    }

    return result;
  }
}

export default BoardService;
