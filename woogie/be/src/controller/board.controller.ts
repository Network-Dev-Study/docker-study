import * as express from 'express';
import { inject } from 'inversify';
import { controller, httpDelete, httpGet, httpPost, httpPut, request, response } from 'inversify-express-utils';
import TYPES from '../constant/types';
import { RequestCreateBoard, RequestDeleteBoard, RequestSearchBoards, RequestUpdateBoard } from '../models/board.model';
import BoardService from '../services/board.service';

@controller('/board')
class BoardController {
  constructor(@inject(TYPES.BoardService) private boardService: BoardService) {}

  @httpGet('/')
  public async getBoards(@request() req: express.Request, @response() res: express.Response) {
    const searchParams: RequestSearchBoards = {
      keyword: String(req.query.keyword) || undefined,
      searchType: String(req.query.searchType) || undefined,
    };

    return await this.boardService.getBoards(searchParams);
  }

  @httpGet('/:boardId')
  public async getBoard(@request() req: express.Request, @response() res: express.Response) {
    const boardId = Number(req.params.boardId);
    return await this.boardService.getBoard(boardId);
  }

  @httpPost('/')
  public async createBoard(@request() req: express.Request, @response() res: express.Response) {
    const newPost: RequestCreateBoard = {
      title: req.body.title,
      content: req.body.content,
    };
    return await this.boardService.createBoard(newPost);
  }

  @httpPut('/:boardId')
  public async updateBoard(@request() req: express.Request, @response() res: express.Response) {
    const updatedPost: RequestUpdateBoard = {
      id: Number(req.params.boardId),
      title: req.body.title,
      content: req.body.content,
    };
    return await this.boardService.updateBoard(updatedPost);
  }

  @httpDelete('/:boardId')
  public async deleteBoard(@request() req: express.Request, @response() res: express.Response) {
    const boardId: RequestDeleteBoard = Number(req.params.boardId);
    return await this.boardService.deleteBoard(boardId);
  }
}

export default BoardController;
