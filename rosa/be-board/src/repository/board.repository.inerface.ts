import {
  RequestCreateBoard,
  RequestDeleteBoard,
  RequestGetBoard,
  RequestSearchBoards,
  RequestUpdateBoard,
} from '../models/board.model';

interface BoardRepositoryInterface {
  getBoards<T>(request: RequestSearchBoards, connection?: any): Promise<T[]>;
  getBoard<T>(request: RequestGetBoard, connection?: any): Promise<T>;
  createBoard<T>(request: RequestCreateBoard, connection?: any): Promise<T>;
  updateBoard<T>(request: RequestUpdateBoard, connection?: any): Promise<T>;
  deleteBoard<T>(request: RequestDeleteBoard, connection?: any): Promise<T>;
}

export default BoardRepositoryInterface;
