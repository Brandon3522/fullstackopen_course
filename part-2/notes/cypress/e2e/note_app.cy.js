describe('Note app', () => {
  // Executed before each test
  beforeEach(() => {
    // Reset database
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    // Generate user
    const user = {
      name: 'Brandon',
      username: 'Brandon',
      password: 'password',
    };
    // Create user
    cy.request('POST', 'http://localhost:3001/api/users/', user);

    cy.visit('http://localhost:3000');
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
      cy.contains('Login').click(); // Search for login button and click
      cy.get('#username').type('Brandon');
      cy.get('#password').type('password');
      cy.get('#login-button').click();
    });

    it('A new note can be created', () => {
      cy.contains('New note').click();
      cy.get('#note-input').type('a new note created by cypress');
      cy.contains('Save').click();
      cy.contains('a new note created by cypress saved');
    });

    describe('a note exists', () => {
      // Create new note before each test
      beforeEach(() => {
        cy.contains('New note').click();
        cy.get('#note-input').type('another note created by cypress');
        cy.contains('Save').click();
      });

      // Test clicking the important button
      it('can be made not important', function () {
        cy.contains('another note created by cypress');
        cy.contains('Make not important').click();

        cy.contains('another note created by cypress');
        cy.contains('Make important');
      });
    });
  });
});
