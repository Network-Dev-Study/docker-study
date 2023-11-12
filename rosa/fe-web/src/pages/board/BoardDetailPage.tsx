import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import BoardSection from '../../layouts/BoardSection';
import { getErrorMesageFrom } from '../../lib/utils';
import BoardService from '../../service/board/BoardService';
import { ResponsePost } from '../../service/board/model/board';
import ActionButton from './components/ActionButton';
import BoardViewTable from './components/BoardViewTable';
import LinkButton from './components/LinkButton';
import MessageBox from './components/MessageBox';
import PageDescription from './components/PageDescription';
import PageTitle from './components/PageTitle';

type RouteParams = {
  boardId: string;
};
type ErrorMesaage = string;

function BoardDetailPage({ history, match }: RouteComponentProps<RouteParams>) {
  const [post, setPost] = useState<ResponsePost | null>(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMesaage>('');

  const { boardId } = match.params;

  const boardService = useMemo(() => new BoardService(), []);

  useEffect(() => {
    boardService
      .loadPost(boardId)
      .then((data) => {
        setPost(data);
      })
      .catch((error) => {
        setErrorMessage(getErrorMesageFrom(error.response?.status));
        setError(true);
      });
  }, [boardId, boardService]);

  const deletePost = useCallback(() => {
    boardService.destroyPost(boardId).then(() => history.push('/'));
  }, [boardId, history, boardService]);

  return (
    <main>
      <BoardSection name="board-view">
        <PageTitle title="게시글 조회" />
        <PageDescription description="작성하신 게시글을 조회할 수 있습니다." />
        {error && <MessageBox title="에러 발생" description={errorMessage} />}
        {post && (
          <>
            <BoardViewTable post={post} />
            <div className="btns">
              <LinkButton name="수정하기" path={`/board/${boardId}/edit`} />
              <ActionButton name="삭제하기" onClickButton={deletePost} />
              <LinkButton name="목록보기" path="/" color="white" />
            </div>
          </>
        )}
      </BoardSection>
    </main>
  );
}

export default BoardDetailPage;
