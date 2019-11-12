describe('Bloglist', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
    });

    it('front page can be opened', function() {
        cy.contains('FSO2019 | Part 7');
        cy.contains('Login to Application');
    });

    it('front page does not contain random text', function() {
        const root = cy.get('#root');
        expect(root).to.not.have.text("Random text")
    });

    it('user can log in with correct credentials', function() {
        cy.get('#username_input').type('Frobella');
        cy.get('#password_input').type('123456');
        cy.get('#login_button').click();
        cy.contains('Frobella logged in');
    });

    it('user can not log in with incorrect credentials', function() {
        cy.get('#username_input').type('Frobella');
        cy.get('#password_input').type('123123');
        cy.get('#login_button').click();
        cy.contains('Invalid username or password');
    });

    describe('when logged in', function() {
        beforeEach(function() {
            cy.request('POST', 'http://localhost:3001/api/testing/reset');
            cy.visit('http://localhost:3000');
            cy.get('#username_input').type('Frobella');
            cy.get('#password_input').type('123456');
            cy.get('#login_button').click();
        });

        it('user can create a new blog post', function() {
            cy.get('#blog_nav').click();
            cy.get('#create_toggle_button').click();
            cy.get('#title_input').type('Demo title');
            cy.get('#author_input').type('John Doe');
            cy.get('#url_input').type('www.test.com');
            cy.get('#create_button').click();
        });

        it('user can log out', function() {
            cy.get('#logout_button').click();
            cy.contains('Login to Application');
        });
    });

    describe('when logged in and at least one post was created', function() {
        beforeEach(function() {
            cy.request('POST', 'http://localhost:3001/api/testing/reset');
            cy.visit('http://localhost:3000');
            cy.get('#username_input').type('Frobella');
            cy.get('#password_input').type('123456');
            cy.get('#login_button').click();

            cy.get('#blog_nav').click();
            cy.get('#create_toggle_button').click();
            cy.get('#title_input').type('Demo title');
            cy.get('#author_input').type('John Doe');
            cy.get('#url_input').type('www.test.com');
            cy.get('#create_button').click();
        });

        it('user can check out individual blog posts', function() {
            cy.get('#blog_nav').click();
            cy.get('.Blog_BlogHeader__2vtL0:first').click();
            cy.contains('added by Frobella');
        });

        it('user can comment on a selected blogpost', function() {
            cy.get('#blog_nav').click();
            cy.get('.Blog_BlogHeader__2vtL0:first').click();
            cy.get('#comment_input').type('This is a demo comment');
            cy.get('#add_comment_button').click();
            cy.contains('This is a demo comment');
        });

        it('user can like a selected blogpost', function() {
            cy.get('#blog_nav').click();
            cy.get('.Blog_BlogHeader__2vtL0:first').click();
            cy.get('#like_button').click();
            cy.contains('1 likes');
        });
    });
    
});