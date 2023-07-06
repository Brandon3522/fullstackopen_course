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

      cy.contains('Invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');
    });
  });

  describe('After login', function () {
    beforeEach(function () {
      cy.login({ username: 'Brandon', password: 'password' });
    });

    it('Create new blog', function () {
      cy.get('.createBlog-button').click();

      cy.get('#title_input').type('cypress test blog 1');
      cy.get('#author_input').type('cypress test blog 1 author');
      cy.get('#url_input').type('cypress test blog 1 URL');

      cy.get('.saveBlog-button').click();

      cy.contains(
        'A new blog, cypress test blog 1, was created by cypress test blog 1 author'
      )
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid');
    });

    it('Add like to new blog', function () {
      // Create blog
      cy.get('.createBlog-button').click();

      cy.get('#title_input').type('cypress test blog 1');
      cy.get('#author_input').type('cypress test blog 1 author');
      cy.get('#url_input').type('cypress test blog 1 URL');

      cy.get('.saveBlog-button').click();

      cy.contains(
        'A new blog, cypress test blog 1, was created by cypress test blog 1 author'
      )
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid');

      // Add like to blog
      cy.get('.viewBlog-button').click();
      cy.get('.addLike-button').click();
      cy.contains('cypress test blog 1 has been updated')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid');
      cy.contains('1');
    });

    it('Delete blog successfully', function () {
      // Create blog
      cy.get('.createBlog-button').click();

      cy.get('#title_input').type('cypress test blog 1');
      cy.get('#author_input').type('cypress test blog 1 author');
      cy.get('#url_input').type('cypress test blog 1 URL');

      cy.get('.saveBlog-button').click();

      // Delete blog
      cy.get('.viewBlog-button').click();
      cy.get('.deleteBlog-button').click();
      // cy.get('button').click();

      cy.contains('cypress test blog 1 has been deleted')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid');
    });
  });
});
