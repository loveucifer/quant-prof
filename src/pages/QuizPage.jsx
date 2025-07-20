import { useState } from 'react';
import { motion } from 'framer-motion';

const questions = [
  {
    question: 'What is the primary goal of quantitative analysis?',
    options: ['Predict prices with 100% accuracy', 'Use mathematical models for financial decisions', 'Rely on intuition for trading', 'Ignore market data'],
    answer: 'Use mathematical models for financial decisions',
  },
  {
    question: 'The Black-Scholes model is used to price what?',
    options: ['Stocks', 'Bonds', 'European Options', 'Real Estate'],
    answer: 'European Options',
  },
  {
    question: 'What does "alpha" represent in portfolio management?',
    options: ['The risk-free rate of return', 'The volatility of a portfolio', 'The excess return of an investment relative to a benchmark', 'The total return of an investment'],
    answer: 'The excess return of an investment relative to a benchmark',
  },
  {
    question: 'What is arbitrage?',
    options: ['A high-risk investment strategy', 'Simultaneously buying and selling an asset to profit from a price difference', 'A long-term investment hold', 'A type of cryptocurrency'],
    answer: 'Simultaneously buying and selling an asset to profit from a price difference',
  },
  {
    question: 'Which of the following is a common risk metric?',
    options: ['Beta', 'Gamma', 'Epsilon', 'Zeta'],
    answer: 'Beta',
  },
];

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerClick = (option) => {
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center">
      <h2 className="text-5xl font-bold text-center mb-12">Test Your Knowledge</h2>
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-2xl border border-gray-700">
        {showScore ? (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-accent">You scored {score} out of {questions.length}</h2>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px #00FF6A' }}
              whileTap={{ scale: 0.95 }}
              onClick={restartQuiz}
              className="bg-accent text-primary font-bold py-3 px-8 rounded-full transition-shadow duration-300 mt-4"
            >
              Retry Quiz
            </motion.button>
          </motion.div>
        ) : (
          <div>
            <h3 className="text-2xl font-bold mb-6">{questions[currentQuestion].question}</h3>
            <div className="flex flex-col space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02, backgroundColor: '#00FF6A', color: '#000000' }}
                  onClick={() => handleAnswerClick(option)}
                  className="bg-gray-800 p-4 rounded-lg text-left text-lg transition-colors duration-200"
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;