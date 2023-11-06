Cypress.Commands.add('seedAndVisit', (seedData = 'fixture:posts') => {
  cy.server();
  cy.route({
    url: 'http://localhost:4000/board',
    method: 'GET',
    status: 200,
    response: seedData,
  });
  cy.visit('/');
});

Cypress.Commands.add('seed', (seedData = 'fixture:posts') => {
  cy.server();
  cy.route({
    url: 'http://localhost:4000/board',
    method: 'GET',
    status: 200,
    response: seedData,
  });
});

Cypress.Commands.add('seedPost', (postId) => {
  cy.fixture('posts').then((posts) => {
    const post = posts.find((p) => p.id === postId);

    cy.server();
    cy.route({
      url: `/board/${postId}`,
      method: 'GET',
      status: 200,
      response: post,
    });
  });
});

Cypress.Commands.add('loadPostAndVisit', (postId) => {
  cy.fixture('posts').then((posts) => {
    const post = posts.find((p) => p.id === postId);

    cy.server();
    cy.route({
      url: `/board/${postId}`,
      method: 'GET',
      status: 200,
      response: post,
    });
    cy.visit(`/board/${postId}`);
  });
});
