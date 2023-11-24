import React from 'react';

type FormError = {
  title: boolean;
  content: boolean;
};

type BoardFormProps = {
  children?: React.ReactNode;
  title: string;
  content: string;
  error: FormError;
  onChangeInput?: (evt: React.ChangeEvent) => void;
  onSubmitForm?: (evt: React.FormEvent) => void;
};

function BoardForm({ children, title, content, error, onChangeInput, onSubmitForm }: BoardFormProps) {
  return (
    <form className="board-form" onSubmit={onSubmitForm}>
      <div>
        <label htmlFor="title">제목</label>
        {error.title && <em className="message--error">제목을 입력해주세요.</em>}
        <input id="title" name="title" value={title} autoFocus onChange={onChangeInput} />
      </div>
      <div>
        <label htmlFor="content">내용</label>
        {error.content && <em className="message--error">내용을 입력해주세요.</em>}
        <textarea id="content" name="content" value={content} onChange={onChangeInput}></textarea>
      </div>
      {children}
    </form>
  );
}

export default BoardForm;
