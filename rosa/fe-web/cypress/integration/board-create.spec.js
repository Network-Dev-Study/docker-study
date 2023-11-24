describe('게시글 작성 페이지', () => {
  beforeEach(() => {
    cy.visit('/createBoard');
  });

  context('인풋', () => {
    it('페이지에 들어 왔을 시, 제목 인풋에 포커스가 된다.', () => {
      cy.focused().should('have.id', 'title');
    });

    it('제목과 내용 작성시 인풋 값이 바뀐다.', () => {
      const typedTitle = '새로운 게시글입니다.';
      const typedContent = '안녕하세요!';

      cy.get('#title').type(typedTitle).should('have.value', typedTitle);
      cy.get('#content').type(typedContent).should('have.value', typedContent);
    });
  });

  context('양식 제출', () => {
    it('새로운 게시글을 추가하고 해당 게시글로 리다이렉트 된다.', () => {
      const newPost = {
        id: 1,
        title: '새로운 게시글입니다.',
        author: '로사',
        content: '반갑습니다.',
        creation_date: new Date().toLocaleDateString().replace(/(\. )/g, '-').replace(/\./, ''),
      };

      cy.server();
      cy.route({
        url: 'http://localhost:4000/board',
        method: 'POST',
        status: 200,
        response: newPost,
      });
      cy.route({
        url: `http://localhost:4000/board/${newPost.id}`,
        method: 'GET',
        status: 200,
        response: newPost,
      });

      cy.get('#title').type(newPost.title);
      cy.get('#content').type(newPost.content);
      cy.contains('저장하기').click();
      cy.url().should('include', `/board/${newPost.id}`);
    });

    it('제목이 빈 문자열인 양식을 제출할 경우 에러 메세지를 보여준다.', () => {
      cy.get('#content').type('반갑습니다.');
      cy.contains('저장하기').click();
      cy.get('.message--error').should('be.visible').and('contain', '제목을 입력해주세요.');
    });

    it('내용이 빈 문자열인 양식을 제출할 경우 에러 메세지를 보여준다.', () => {
      cy.get('#title').type('새로운 게시글입니다.');
      cy.contains('저장하기').click();
      cy.get('.message--error').should('be.visible').and('contain', '내용을 입력해주세요.');
    });

    it('빈 양식을 제출할 경우 에러 메세지들을 보여준다.', () => {
      const errorMessages = [{ text: '제목을 입력해주세요.' }, { text: '내용을 입력해주세요.' }];

      cy.contains('저장하기').click();
      cy.get('.message--error').should('have.length', 2);
      cy.wrap(errorMessages).each((msg) => cy.contains(msg.text).should('be.visible'));
    });
  });

  context('취소 버튼', () => {
    it('클릭시 게시글 목록 조회 페이지로 이동한다.', () => {
      cy.seed();

      cy.contains('취소하기').click();
      cy.url().should('include', '/');
    });
  });
});
