import React, { useCallback, useMemo, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import BoardSection from '../../layouts/BoardSection';
import BoardService from '../../service/board/BoardService';
import ActionButton from './components/ActionButton';
import BoardForm from './components/BoardForm';
import LinkButton from './components/LinkButton';
import PageDescription from './components/PageDescription';
import PageTitle from './components/PageTitle';

function BoardCreatePage({ history }: RouteComponentProps) {
  const [post, setPost] = useState({ title: '', content: '' });
  const [error, setError] = useState({ title: false, content: false });

  const boardService = useMemo(() => new BoardService(), []);

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
      console.log(post);
      !post.title && setError((error) => ({ ...error, title: true }));
      !post.content && setError((error) => ({ ...error, content: true }));
      post.title && post.content && boardService.savePost(post).then((data) => history.push(`/board/${data.id}`));
    },
    [post, history, boardService]
  );

  return (
    <main>
      <BoardSection name="board-create">
        <PageTitle title="게시글 작성" />
        <PageDescription description="게시글의 제목과 내용을 작성할 수 있습니다." />
        <BoardForm
          title={post.title}
          content={post.content}
          error={error}
          onChangeInput={onChangeInput}
          onSubmitForm={onSubmitForm}
        >
          <div className="btns">
            <ActionButton name="저장하기" type="submit" />
            <LinkButton name="취소하기" path="/" color="white" />
          </div>
        </BoardForm>
      </BoardSection>
    </main>
  );
}

export default BoardCreatePage;
