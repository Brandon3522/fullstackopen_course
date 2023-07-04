describe('Blog app', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    // Create user
    const user = {
      username: 'Brandon',
      name: 'Brandon',
      password: 'password',
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);

    cy.visit('http://localhost:3000');
  });

  it('Login form displayed', function () {
    cy.contains('Login');
    cy.contains('Username');
    cy.contains('Password');
  });

  describe('Login', function () {
    it('Login success', function () {
      cy.get('.username-input').type('Brandon');
      cy.get('.password-input').type('password');
      cy.get('.login-button').click();

      cy.contains('Brandon logged in successfully');
    });

    it('Login error', function () {
      cy.get('.username-input').type('Brandon');
      cy.get('.password-input').type('assword');
      cy.get('.login-button').click();

      cy.contains('Invalid username or password');
    });
  });
});
