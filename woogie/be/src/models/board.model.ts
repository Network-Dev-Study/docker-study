export interface RequestSearchBoards {
  keyword?: string;
  searchType?: string;
}

export type RequestGetBoard = number;

export interface RequestCreateBoard {
  title: string;
  content: string;
}

export interface RequestUpdateBoard {
  id: number;
  title: string;
  content: string;
}

export type RequestDeleteBoard = number;
