import React from 'react';
import { Link } from 'react-router-dom';
import { ResponsePost } from '../../../service/board/model/board';

type BoardListTableProps = {
  posts: Array<ResponsePost>;
};

function BoardRow({ id, title, author, creation_date }: ResponsePost) {
  return (
    <tr>
      <td>{id}</td>
      <td>
        <Link to={`/board/${id}`}>{title}</Link>
      </td>
      <td>{author}</td>
      <td>{creation_date}</td>
    </tr>
  );
}

function BoardListTable({ posts }: BoardListTableProps) {
  return (
    <table>
      <colgroup>
        <col style={{ width: '10%' }} />
        <col style={{ width: '60%' }} />
        <col style={{ width: '10%' }} />
        <col style={{ width: '20%' }} />
      </colgroup>
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
        </tr>
      </thead>
      <tbody>
        {posts.length > 0 ? (
          posts.map((post) => <BoardRow key={post.id} {...post} />)
        ) : (
          <tr>
            <td colSpan={4}>게시글이 존재하지 않습니다. 게시글을 작성해 주세요!</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default BoardListTable;
