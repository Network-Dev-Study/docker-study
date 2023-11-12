describe('게시글 목록 조회 페이지', () => {
  beforeEach(() => {
    cy.seedAndVisit();
  });

  it('게시글 제목을 클릭하면 해당 게시글 페이지로 이동한다.', () => {
    cy.fixture('posts').then((posts) => {
      cy.wrap(posts).each((post) => {
        cy.seedPost(post.id);

        cy.visit('/');
        cy.contains(post.title).click();
        cy.url().should('include', `/board/${post.id}`);
      });
    });
  });

  it('글쓰기 버튼을 클릭하면 글쓰기 페이지로 이동한다.', () => {
    cy.contains('글쓰기').click();

    cy.url().should('include', '/createBoard');
  });
});
