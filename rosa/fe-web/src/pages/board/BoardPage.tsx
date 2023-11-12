import React, { useEffect, useMemo, useState } from 'react';
import BoardSection from '../../layouts/BoardSection';
import BoardService from '../../service/board/BoardService';
import { ResponsePost } from '../../service/board/model/board';
import BoardListTable from './components/BoardListTable';
import LinkButton from './components/LinkButton';
import MessageBox from './components/MessageBox';
import PageDescription from './components/PageDescription';
import PageTitle from './components/PageTitle';

function BoardPage() {
  const [posts, setPosts] = useState<ResponsePost[]>([]);
  const [error, setError] = useState(false);

  const boardService = useMemo(() => new BoardService(), []);

  useEffect(() => {
    boardService
      .loadPosts()
      .then((data) => setPosts(data))
      .catch(() => setError(true));
  }, [boardService]);

  return (
    <main>
      <BoardSection name="board">
        <PageTitle title="게시판" />
        <PageDescription description="React, TypeScript, Cypress를 이용해서 만든 게시판입니다." />
        {error ? (
          <MessageBox title="에러 발생" description="에러가 발생했습니다. 관리자에게 문의해 주세요!" />
        ) : (
          <>
            <div className="action">
              <LinkButton name="글쓰기" path="/createBoard" />
            </div>
            <BoardListTable posts={posts} />
          </>
        )}
      </BoardSection>
    </main>
  );
}

export default BoardPage;
