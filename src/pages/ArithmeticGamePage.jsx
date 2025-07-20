import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ClockIcon, StarIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

const ArithmeticGamePage = () => {
  const [gameState, setGameState] = useState('waiting'); // waiting, countdown, playing, finished
  const [countdown, setCountdown] = useState(3);
  const [timer, setTimer] = useState(120);
  const [score, setScore] = useState(0);
  const [problem, setProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const answerInputRef = useRef(null);

  // Function to generate a new arithmetic problem
  const generateProblem = () => {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const operator = ['+', '-', '*'][Math.floor(Math.random() * 3)];
    let question = `${num1} ${operator} ${num2}`;
    let answer = 0;
    switch (operator) {
      case '+': answer = num1 + num2; break;
      case '-': answer = num1 - num2; break;
      case '*': answer = num1 * num2; break;
    }
    setProblem({ question, answer });
    setUserAnswer('');
  };

  // Game state management with useEffect
  useEffect(() => {
    if (gameState === 'countdown') {
      if (countdown > 0) {
        const timerId = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timerId);
      } else {
        setGameState('playing');
        setTimer(120);
        generateProblem();
        answerInputRef.current?.focus();
      }
    } else if (gameState === 'playing' && timer > 0) {
      const timerId = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timer === 0) {
      setGameState('finished');
    }
  }, [gameState, countdown, timer]);

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (parseInt(userAnswer) === problem.answer) {
      setScore(score + 1);
    }
    generateProblem();
  };

  const startGame = () => {
    setGameState('countdown');
    setCountdown(3);
    setScore(0);
  };

  if (gameState === 'waiting') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-4xl font-bold text-accent mb-4">Arithmetic Game</h1>
        <p className="text-gray-400 mb-8">Test your mental math speed.</p>
        <button onClick={startGame} className="bg-accent text-primary font-bold py-3 px-8 rounded-full hover:shadow-glow">
          Start Game
        </button>
      </div>
    );
  }

  if (gameState === 'countdown') {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <motion.h1 initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} key={countdown} className="text-9xl font-bold text-accent">
          {countdown}
        </motion.h1>
      </div>
    );
  }

  if (gameState === 'finished') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-4xl font-bold text-white mb-4">Game Over!</h1>
        <p className="text-2xl text-accent mb-8">Your final score: {score}</p>
        <button onClick={startGame} className="bg-accent text-primary font-bold py-3 px-8 rounded-full hover:shadow-glow">
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-700 p-8">
        <div className="flex justify-between items-center mb-8 text-lg">
          <div className="flex items-center gap-2 text-accent">
            <StarIcon className="h-6 w-6" />
            <span>{score} points</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <ClockIcon className="h-6 w-6" />
            <span>{timer} seconds</span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-6xl font-mono text-white mb-8">{problem?.question} = ?</p>
          <form onSubmit={handleAnswerSubmit}>
            <input
              ref={answerInputRef}
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="bg-transparent border-b-2 border-accent text-6xl text-center text-white w-48 focus:outline-none"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ArithmeticGamePage;
