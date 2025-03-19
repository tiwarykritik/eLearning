// src/components/Quiz.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEnrollment } from "./EnrollmentContext";

// Mock quiz data - in a real app, this would come from an API
const quizQuestions = {
  1: [ // Web Development quiz
    {
      id: 1,
      question: "Which tag is used to define a hyperlink in HTML?",
      options: ["<a>", "<h>", "<link>", "<href>"],
      correctAnswer: 0
    },
    {
      id: 2,
      question: "What does CSS stand for?",
      options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
      correctAnswer: 1
    },
    // Add more questions...
  ],
  2: [ // Java quiz
    {
      id: 1,
      question: "Which of these is not a Java keyword?",
      options: ["static", "Boolean", "void", "private"],
      correctAnswer: 1
    },
    {
      id: 2,
      question: "Which class is the parent class of all classes in Java?",
      options: ["String", "System", "Object", "Main"],
      correctAnswer: 2
    },
    // Add more questions...
  ],
  3: [ // Data Structures quiz
    {
      id: 1,
      question: "Which data structure uses LIFO?",
      options: ["Queue", "Stack", "List", "Tree"],
      correctAnswer: 1
    },
    {
      id: 2,
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(1)", "O(n²)", "O(log n)"],
      correctAnswer: 3
    },
    // Add more questions...
  ]
};

const Quiz = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { quizStatus, submitQuiz } = useEnrollment();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState(0);
  
  const questions = quizQuestions[courseId] || [];
  
  // Check if quiz is unlocked
  useEffect(() => {
    if (!quizStatus[courseId]?.unlocked) {
      navigate("/dashboard");
    }
  }, [courseId, quizStatus, navigate]);
  
  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex
    });
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const handleSubmitQuiz = () => {
    // Calculate score
    let correctAnswers = 0;
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const finalScore = Math.round((correctAnswers / questions.length) * 100);
    setScore(finalScore);
    setQuizComplete(true);
    
    // Submit to context
    submitQuiz(parseInt(courseId), finalScore);
  };
  
  // Return to dashboard after quiz completion
  const handleReturn = () => {
    navigate("/dashboard");
  };
  
  if (quizComplete) {
    return (
      <div className="container mt-4">
        <div className="card">
          <div className="card-header">
            Quiz Results
          </div>
          <div className="card-body text-center">
            <h3>Your Score: {score}%</h3>
            <p>You answered {score}% of the questions correctly!</p>
            <button className="btn btn-primary" onClick={handleReturn}>
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  if (questions.length === 0) {
    return <div>Loading quiz questions...</div>;
  }
  
  const question = questions[currentQuestion];
  
  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          Quiz - Question {currentQuestion + 1} of {questions.length}
        </div>
        <div className="card-body">
          <h5>{question.question}</h5>
          <div className="options mt-3">
            {question.options.map((option, index) => (
              <div className="form-check" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name={`question_${question.id}`}
                  id={`option_${index}`}
                  checked={selectedAnswers[question.id] === index}
                  onChange={() => handleAnswerSelect(question.id, index)}
                />
                <label className="form-check-label" htmlFor={`option_${index}`}>
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <button
            className="btn btn-secondary"
            onClick={handlePrevQuestion}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          
          {currentQuestion < questions.length - 1 ? (
            <button
              className="btn btn-primary"
              onClick={handleNextQuestion}
              disabled={selectedAnswers[question.id] === undefined}
            >
              Next
            </button>
          ) : (
            <button
              className="btn btn-success"
              onClick={handleSubmitQuiz}
              disabled={Object.keys(selectedAnswers).length !== questions.length}
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
      
      {/* Progress indicator */}
      <div className="progress mt-3">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${(Object.keys(selectedAnswers).length / questions.length) * 100}%` }}
          aria-valuenow={(Object.keys(selectedAnswers).length / questions.length) * 100}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {Object.keys(selectedAnswers).length}/{questions.length} Questions Answered
        </div>
      </div>
    </div>
  );
};

export default Quiz;