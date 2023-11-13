const BASE_URL = 'http://localhost:4000';

describe('Smoke tests', () => {
  beforeEach(() => {
    cy.request('GET', `${BASE_URL}/board`)
      .its('body')
      .each((post) => cy.request('DELETE', `http://localhost:4000/board/${post.id}`));
  });

  context('게시글이 없을 경우', () => {
    it('새로운 게시글을 생성한다.', () => {
      cy.server();
      cy.route('POST', `${BASE_URL}/board`).as('create');

      cy.fixture('new-post').then((posts) => {
        posts.forEach((post) => {
          cy.visit('/createBoard');

          cy.get('#title').type(post.title);
          cy.get('#content').type(post.content);
          cy.contains('저장하기').click();

          cy.wait('@create');

          cy.get('table').should('contain', post.title).and('contain', post.content);
        });
      });
    });
  });

  context('게시글이 있는 경우', () => {
    // beforeEach -> 더미 게시글 생성(post)
    beforeEach(() => {
      cy.fixture('new-post').then((posts) => {
        posts.forEach((post) => {
          cy.request('POST', `${BASE_URL}/board`, post);
        });
      });
    });

    it('게시글을 조회한다.', () => {
      cy.server();
      cy.route('GET', `${BASE_URL}/board/*`).as('load');

      cy.fixture('new-post').then((posts) => {
        cy.visit('/');

        cy.get('table tbody tr').should('have.length', posts.length);

        posts.forEach((post) => {
          cy.visit('/');

          cy.contains(post.title).click();
          cy.wait('@load');

          cy.get('table').should('contain', post.title).and('contain', post.content);
        });
      });
    });

    it('게시글을 수정한다.', () => {
      let updatedPosts;
      cy.fixture('edit-post').then((posts) => (updatedPosts = posts));

      cy.server();
      cy.route('GET', `${BASE_URL}/board/*`).as('load');
      cy.route('PUT', `${BASE_URL}/board/*`).as('update');

      cy.request('GET', `${BASE_URL}/board`)
        .its('body')
        .each((post, index) => {
          cy.visit(`/board/${post.id}/edit`);
          cy.wait('@load');

          cy.get('#title').clear().type(updatedPosts[index].title);
          cy.get('#content').clear().type(updatedPosts[index].content);
          cy.contains('수정하기').click();

          cy.wait('@update');

          cy.get('table').should('contain', updatedPosts[index].title).and('contain', updatedPosts[index].content);
        });
    });

    it('게시글을 삭제한다.', () => {
      let postsLength;
      cy.fixture('new-post').then((posts) => (postsLength = posts.length));

      cy.server();
      cy.route('DELETE', `${BASE_URL}/board/*`).as('delete');

      cy.request('GET', `${BASE_URL}/board`)
        .its('body')
        .each((post, index) => {
          cy.visit(`/board/${post.id}`);

          cy.contains('삭제하기').click();
          cy.wait('@delete');

          const count = postsLength - (index + 1);
          if (count) {
            cy.get('table tbody tr').should('have.length', count);
          } else {
            cy.get('table tbody').should('contain', '게시글이 존재하지 않습니다. 게시글을 작성해 주세요!');
          }
        });
    });
  });
});
