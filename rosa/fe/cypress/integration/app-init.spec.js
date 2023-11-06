describe('앱 시작할 때,', () => {
  context('게시글이 있는 경우', () => {
    beforeEach(() => {
      cy.seedAndVisit();
    });

    it('게시글을 보여준다.', () => {
      cy.get('tbody tr').should('have.length', 3);
    });

    it('네트워크 에러가 발생한다면, 에러 메세지를 보여준다.', () => {
      cy.route({
        url: 'http://localhost:4000/board',
        method: 'GET',
        status: 500,
        response: {},
      });

      cy.get('table').should('not.exist');
      cy.get('.message-box').should('be.visible').and('contain', '에러가 발생했습니다. 관리자에게 문의해 주세요!');
    });
  });

  context('게시글이 없는 경우', () => {
    it('게시글이 없다는 메세지를 보여준다.', () => {
      cy.seedAndVisit([]);

      cy.contains('게시글이 존재하지 않습니다. 게시글을 작성해 주세요!');
    });
  });
});
