import React from 'react';
import { ResponsePost } from '../../../service/board/model/board';

type BoardViewProps = {
  post: ResponsePost;
};

function BoardViewTable({ post }: BoardViewProps) {
  const { title, author, content, creation_date, update_date } = post;

  return (
    <table>
      <colgroup>
        <col style={{ width: '20%' }} />
        <col style={{ width: '80%' }} />
      </colgroup>
      <tbody>
        <tr>
          <th>제목</th>
          <td>{title}</td>
        </tr>
        <tr>
          <th>작성자</th>
          <td>{author}</td>
        </tr>
        <tr>
          <th>작성일</th>
          <td>{update_date || creation_date}</td>
        </tr>
        <tr>
          <th className="content">내용</th>
          <td className="content">{content}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default BoardViewTable;
