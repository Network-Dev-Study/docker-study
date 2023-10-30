const postId = 1;

describe('게시글 수정 페이지', () => {
  beforeEach(() => {
    cy.seedPost(postId);
  });

  it('수정하고자 하는 게시글의 제목과 내용이 인풋에 입력된다.', () => {
    cy.visit(`/board/${postId}/edit`);

    cy.fixture('posts').then((posts) => {
      const post = posts.find((post) => post.id === postId);
      const { title, content } = post;

      cy.get('#title').should('have.value', title);
      cy.get('#content').should('have.value', content);
    });
  });

  it('수정하기 버튼을 클릭한다면, 게시글을 수정하고 해당 게시글 조회 페이지로 리다이렉트 된다.', () => {
    cy.fixture('posts').then((posts) => {
      const post = posts.find((post) => post.id === postId);
      const updatedPost = {
        ...post,
        title: '수정되었습니다.',
        content: '안녕하세요!!',
        update_date: new Date().toLocaleDateString().replace(/(\. )/g, '-').replace(/\./, ''),
      };

      cy.route({
        url: `http://localhost:4000/board/${postId}`,
        method: 'PUT',
        status: 200,
        response: updatedPost,
      });
      cy.route({
        url: `http://localhost:4000/board/${postId}`,
        method: 'GET',
        status: 200,
        response: updatedPost,
      });
      cy.visit(`/board/${postId}/edit`);

      cy.get('#title').clear().type(updatedPost.title);
      cy.get('#content').clear().type(updatedPost.content);
      cy.contains('수정하기').click();
      cy.url().should('include', `/board/${postId}`);
      Object.keys(updatedPost).forEach(
        (key) => key !== 'id' && key !== 'creation_date' && cy.contains(updatedPost[key]).should('be.visible')
      );
    });
  });

  it('취소하기 버튼을 클릭한다면, 해당 게시글 조회 페이지로 이동한다.', () => {
    cy.visit(`/board/${postId}/edit`);

    cy.contains('취소하기').click();
    cy.url().should('include', `/board/${postId}`);
  });
});
