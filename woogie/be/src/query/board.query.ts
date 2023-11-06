import { QueryInfo } from '../models/transaction.model';

export enum BoardQueryId {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
}

export const BoardQuery = (queryId: BoardQueryId, request: any = {}): QueryInfo => {
  const queryInfo: QueryInfo = {
    queryStr: ``,
    queryParams: [],
  };
  const queryStr: string[] = [];
  const queryParams: any[] = [];

  switch (queryId) {
    case BoardQueryId.getBoards:
      queryStr.push(`
        SELECT
          b.board_no AS id,
          b.board_title AS title,
          b.board_content AS content,
          b.creation_date,
          b.updated_date
        FROM board b
        WHERE TRUE
      `);

      if (request.keyword && request.searchType) {
        switch (request.searchType) {
          case 'title':
            queryStr.push(` AND INSTR(b.board_title, ?) > 0`);
            queryParams.push(request.keyword);
            break;
          case 'content':
            queryStr.push(` AND INSTR(b.board_content, ?) > 0`);
            queryParams.push(request.keyword);
            break;
          case 'title_content':
            queryStr.push(` AND INSTR(b.board_title, ?) > 0 OR INSTR(b.board_content, ?) > 0`);
            queryParams.push(request.keyword, request.keyword);
            break;
          default:
            break;
        }
      }
      break;

    case BoardQueryId.getBoard:
      queryStr.push(`
        SELECT
          b.board_no AS id,
          b.board_title AS title,
          b.board_content AS content,
          b.creation_date,
          b.updated_date
        FROM board b
        WHERE b.board_no = ?
      `);
      queryParams.push(request);
      break;

    case BoardQueryId.createBoard:
      queryStr.push(`
        INSERT INTO board
        (
          board_title,
          board_content
        )
        VALUES (?, ?)
      `);
      queryParams.push(request.title);
      queryParams.push(request.content);
      break;

    case BoardQueryId.updateBoard:
      queryStr.push(`
        UPDATE board
        SET
          board_title = ?,
          board_content = ?,
          updated_date = NOW()
        WHERE board_no = ?
      `);
      queryParams.push(request.title);
      queryParams.push(request.content);
      queryParams.push(request.id);
      break;

    case BoardQueryId.deleteBoard:
      queryStr.push(`
        DELETE FROM board
        WHERE board_no = ?
      `);
      queryParams.push(request);
      break;

    default:
      break;
  }

  if (queryStr.length > 0) {
    queryInfo.queryStr = queryStr.join(' ');
    queryInfo.queryParams = queryParams;
  }

  return queryInfo;
};
