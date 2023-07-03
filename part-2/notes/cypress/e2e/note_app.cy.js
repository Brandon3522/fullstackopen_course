describe('Note app', () => {
  // Executed before each test
  beforeEach(() => {
    // Reset database, base backend URL in config file
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    // Generate user
    const user = {
      name: 'Brandon',
      username: 'Brandon',
      password: 'password',
    };
    // Create user, base backend URL in config file
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user);

    // Uses base URL in config file
    cy.visit('');
  });

  it('front page opened', () => {
    cy.contains('Notes');
    cy.contains('Full Stack Open Course, Brandon Sitz');
  });

  it('login form opened', () => {
    cy.contains('Login').click(); // Search for login button and click
    cy.get('#username').type('Brandon');
    cy.get('#password').type('password');
    cy.get('#login-button').click();

    cy.contains('Brandon logged in successfully');
  });

  it('login fails with wrong password', () => {
    cy.contains('Login').click();
    cy.get('#username').type('Brandon');
    cy.get('#password').type('Password1');
    cy.get('#login-button').click();

    cy.contains('Invalid credentials');

    // Should keyword
    cy.get('.error')
      .should('contain', 'Invalid credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid');

    cy.get('html').should('not.contain', 'Brandon logged in successfully');
  });

  // Test failure
  /* it('front page creates random text', function() {
		cy.visit('http://localhost:3000');
		cy.contains('wtf');
	}) */

  describe('When logged in', () => {
    // Login before each test
    beforeEach(() => {
      // Uses function from cypress commands
      cy.login({ username: 'Brandon', password: 'password' });
    });

    it('A new note can be created', () => {
      cy.contains('New note').click();
      cy.get('#note-input').type('a new note created by cypress');
      cy.contains('Save').click();
      cy.contains('a new note created by cypress saved');
    });

    describe('several notes exist', () => {
      // Create new notes before each test
      beforeEach(() => {
        // First note
        cy.contains('New note').click();
        cy.get('#note-input').type('first note');
        cy.contains('Save').click();

        // Second note
        cy.contains('New note').click();
        cy.get('#note-input').type('second note');
        cy.contains('Save').click();
        // cy.createNote({ content: 'first note', important: false });
        // cy.createNote({ content: 'second note', important: false });
        // cy.createNote({ content: 'third note', important: false });
      });

      // Test clicking the important button
      it.only('can be made not important', function () {
        cy.get('.note').contains('second note').contains('Make not important').click();

        cy.get('.note').contains('second note').contains('Make important');
      });
    });
  });
});
