describe('Quiz', () => {
    let rawQuestions;
  
    beforeEach(() => {
      // Load the questions from the fixture
      cy.fixture('questions.json').then((data) => {
        rawQuestions = data.questions; // Assign the questions array to rawQuestions
  
        // Intercept the API call and mock the response
        cy.intercept('GET', '/api/questions/random', {
          statusCode: 200,
          body: rawQuestions // Now this is properly defined
        }).as('getRandomQuestions');
  
        // Change the visit path to '/'
        cy.visit('/'); // Correct the path to root if your quiz is on the home page
        cy.url().should('include', '/'); // Ensure we are on the correct page
      });
    });
  
    it('allows users to select answers and submit the quiz', () => {
      // Wait for the start button to appear
      cy.get('[data-cy=start-quiz-button]', { timeout: 10000 }) // Increase timeout
        .should('be.visible')
        .click();
  
      // Wait for the API request to be intercepted
      cy.wait('@getRandomQuestions').its('response.statusCode').should('eq', 200);
  
      // Verify that the question appears correctly
      cy.get('[data-cy=question-0]', { timeout: 10000 })
        .should('contain', rawQuestions[0].question);
  
      // Verify that the first answer option is visible
      cy.get('[data-cy=option-0-0]', { timeout: 10000 })
        .should('be.visible')
        .should('contain', rawQuestions[0].answers[0].text); // Check the first answer text
  
      // Log the correct answer's index and text for debugging
      cy.log('Correct answer:', rawQuestions[0].answers.find(answer => answer.isCorrect).text);
  
      // Click on the correct answer (based on isCorrect property)
      const correctAnswerIndex = rawQuestions[0].answers.findIndex(answer => answer.isCorrect);
      cy.get(`[data-cy=option-0-${correctAnswerIndex}]`).click(); // Click the correct answer button
  
      // Verify that the result message appears and contains the expected text
      cy.get('[data-cy=result-message]')
        .should('exist')
        .and('contain', 'Quiz Completed');
    });
  });
  