import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import BoardSection from '../../layouts/BoardSection';
import BoardService from '../../service/board/BoardService';
import ActionButton from './components/ActionButton';
import BoardForm from './components/BoardForm';
import LinkButton from './components/LinkButton';
import PageDescription from './components/PageDescription';
import PageTitle from './components/PageTitle';

type RouteParams = {
  boardId: string;
};

function BoardEditPage({ history, match }: RouteComponentProps<RouteParams>) {
  const [post, setPost] = useState({ title: '', content: '' });
  const [error, setError] = useState({ title: false, content: false });
  const { boardId } = match.params;

  const boardService = useMemo(() => new BoardService(), []);

  useEffect(() => {
    boardService.loadPost(boardId).then((data) => setPost(data));
  }, [boardId, boardService]);

  const onChangeInput = useCallback(
    (evt) => {
      const { name, value } = evt.target;
      setPost({
        ...post,
        [name]: value,
      });
    },
    [post]
  );

  const onSubmitForm = useCallback(
    (evt) => {
      evt.preventDefault();
      !post.title && setError((error) => ({ ...error, title: true }));
      !post.content && setError((error) => ({ ...error, content: true }));
      post.title &&
        post.content &&
        boardService
          .updatePost(boardId, post)
          .then((data) => history.push(`/board/${data.id}`))
          .catch((error) => console.error(error));
    },
    [post, history, boardId, boardService]
  );

  return (
    <main>
      <BoardSection name="board-edit">
        <PageTitle title="게시글 수정" />
        <PageDescription description="게시글의 제목과 내용을 수정할 수 있습니다." />
        <BoardForm
          title={post.title}
          content={post.content}
          error={error}
          onChangeInput={onChangeInput}
          onSubmitForm={onSubmitForm}
        >
          <div className="btns">
            <ActionButton name="수정하기" type="submit" />
            <LinkButton name="취소하기" path={`/board/${boardId}`} color="white" />
          </div>
        </BoardForm>
      </BoardSection>
    </main>
  );
}

export default BoardEditPage;
