const postId = 1;

describe('게시글 조회 페이지', () => {
  context('게시글이 있는 경우', () => {
    it('게시글을 보여준다.', () => {
      cy.loadPostAndVisit(postId);

      cy.fixture('posts').then((posts) => {
        const post = posts.find((p) => p.id === postId);

        Object.keys(post).forEach(
          (key) => key !== 'id' && key !== 'update_date' && cy.contains(post[key]).should('be.visible')
        );
      });
    });

    it('네트워크 에러가 발생한다면, 에러 메세지를 보여준다.', () => {
      cy.server();
      cy.route({
        url: `http://localhost:4000/board/${postId}`,
        method: 'GET',
        status: 500,
        response: {},
      });
      cy.visit(`/board/${postId}`);

      cy.get('table').should('not.exist');
      cy.get('.message-box').should('contain', '에러가 발생했습니다. 관리자에게 문의해 주세요!');
    });

    it('수정하기 버튼을 클릭한다면, 수정 페이지로 이동한다.', () => {
      cy.loadPostAndVisit(postId);

      cy.contains('수정하기').click();
      cy.url().should('include', `/board/${postId}/edit`);
    });

    it('삭제하기 버튼을 클릭한다면, 게시글이 삭제되고 게시글 목록 조회 페이지로 리다이렉트 된다.', () => {
      cy.loadPostAndVisit(postId);

      cy.fixture('posts').then((posts) => {
        const post = posts.find((post) => post.id === postId);
        const filteredPosts = posts.filter((post) => post.id !== postId);
        cy.route({
          url: `/board/${postId}`,
          method: 'DELETE',
          status: 200,
          response: post,
        });
        cy.seed(filteredPosts);

        cy.contains('삭제하기').click();
        cy.url().should('include', '/');
        filteredPosts.forEach((post) => {
          cy.contains(post.title).should('be.visible');
        });
      });
    });

    it('목록보기 버튼을 클릭한다면, 게시글 목록 조회 페이지로 이동한다.', () => {
      cy.seed();
      cy.loadPostAndVisit(postId);

      cy.contains('목록보기').click();
      cy.url().should('include', '/');
    });
  });

  context('게시글이 없는 경우', () => {
    it('에러 메세지를 보여준다.', () => {
      cy.server();
      cy.route({
        url: `http://localhost:4000/board/${postId}`,
        method: 'GET',
        status: 404,
        response: {},
      });
      cy.visit(`/board/${postId}`);

      cy.get('table').should('not.exist');
      cy.get('.message-box').should('contain', '게시글이 존재하지 않습니다.');
    });
  });
});
