import questions from '../support/data/questions.json'; // Path to mock data

describe('Quiz Component', () => {
  beforeEach(() => {
    // Mocking the GET request that fetches random quiz questions
    cy.intercept('GET', '/api/questions/random', {
      statusCode: 200,
      body: { questions: questions.questions }, // Use mock data here
    }).as('getRandomQuestions');
    
    // Visit the page to load the Quiz component
    cy.visit('/');
  });

  it('renders quiz questions and options', () => {
    // Wait for the intercepted GET request to complete
    cy.wait('@getRandomQuestions');
    
    // Check if quiz container exists
    cy.get('[data-cy=quiz-container]').should('exist')
      .within(() => {
        // Check question and options
        cy.get('[data-cy=question-0]').should('contain', questions.questions[0].question);
        cy.get('[data-cy=option-0-0]').should('contain', questions.questions[0].options[0]);
        cy.get('[data-cy=option-0-1]').should('contain', questions.questions[0].options[1]);
      });
  });

  it('allows users to select answers and submit the quiz', () => {
    // Wait for the intercepted GET request to complete
    cy.wait('@getRandomQuestions');
    
    // Simulate clicking on the answer option and submitting the quiz
    cy.get('[data-cy=option-0-1]').click(); // Select option 1
    cy.get('[data-cy=submit-button]').click(); // Submit the quiz
    
    // Verify if the result message appears
    cy.get('[data-cy=result-message]')
      .should('exist')
      .and('contain', 'Thank you for completing the quiz!');
  });
});
