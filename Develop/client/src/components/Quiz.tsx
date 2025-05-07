import React, { useState, useEffect } from 'react';
import { Question } from '../models/Question'; // Import the Question interface
import { Answer } from '../models/Answer'; // Import the Answer interface

// Importing the mock questions data (assuming the questions are static for now)
import { getQuestions } from '../services/questionApi'; // Update this with correct path if necessary

const Quiz: React.FC = () => {
  const [currentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);

  // Get current question based on currentQuestionIndex
  const [questions, setQuestions] = useState<Question[]>([]);
  const currentQuestion: Question | undefined = questions[currentQuestionIndex];

  useEffect(() => {
    const fetchQuestions = async () => {
      const fetchedQuestions = await getQuestions();
      setQuestions(fetchedQuestions);
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    // You can add additional logic to fetch the questions if needed
    // For now, we are assuming the questions are static
  }, []);

  const handleOptionClick = (index: number) => {
    setSelectedOption(index); // Set the selected option based on user click
  };

  const handleSubmit = () => {
    // Here you could add logic to check the answer and keep track of score
    setIsQuizComplete(true); // Mark the quiz as complete
  };

  return (
    <div data-cy="quiz-container">
      <div data-cy={`question-${currentQuestionIndex}`}>
        <h2>{currentQuestion.question}</h2>
        <div>
          {currentQuestion.answers.map((answer: Answer, index: number) => (
            <button
              key={index}
              data-cy={`option-${currentQuestionIndex}-${index}`}
              className={`btn ${selectedOption === index ? 'selected' : ''}`}
              onClick={() => handleOptionClick(index)}
            >
              {answer.text}
            </button>
          ))}
        </div>
      </div>

      <div>
        <button
          data-cy="submit-button"
          onClick={handleSubmit}
          disabled={selectedOption === null} // Disable submit if no option is selected
        >
          Submit
        </button>
      </div>

      {isQuizComplete && (
        <div data-cy="result-message">
          <p>Thank you for completing the quiz!</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
