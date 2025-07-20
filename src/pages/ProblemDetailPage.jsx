import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import problemsData from '../data/problems.json';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

const ProblemDetailPage = () => {
  const { id } = useParams();
  const problem = problemsData.find(p => p.id === parseInt(id));
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  if (!problem) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl text-accent">Problem not found.</h2>
        <Link to="/problems" className="text-white hover:underline mt-4 inline-block">
          &larr; Back to Problems
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link
          to="/problems"
          className="flex items-center gap-2 text-gray-400 hover:text-accent mb-8 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Back to Problems List
        </Link>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-700 p-8 max-w-4xl mx-auto">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-accent">{problem.title}</h1>
            <span className={`text-sm px-3 py-1 rounded-full whitespace-nowrap ${
                problem.difficulty === 'Easy' ? 'bg-green-900 text-green-300' :
                problem.difficulty === 'Medium' ? 'bg-yellow-900 text-yellow-300' :
                'bg-red-900 text-red-300'
            }`}>
                {problem.difficulty}
            </span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-400 mb-6">
            <span>Topic: <span className="font-semibold text-gray-200">{problem.topic}</span></span>
            <span>Tags: {problem.tags.join(', ')}</span>
          </div>

          <div className="prose prose-invert max-w-none text-gray-300 space-y-6">
            <div>
              <h4 className="font-semibold text-white text-lg">Question:</h4>
              <p>{problem.question}</p>
            </div>
            <div className="border-t border-gray-700"></div>
            <div>
              <h4 className="font-semibold text-white text-lg">Answer:</h4>
              <div
                className={`prose prose-invert max-w-none text-gray-400 cursor-pointer transition-all duration-300 ${!isAnswerRevealed ? 'blur-md select-none' : ''}`}
                onClick={() => setIsAnswerRevealed(true)}
                title="Click to reveal answer"
              >
                <p>{problem.answer}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProblemDetailPage;
