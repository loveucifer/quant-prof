import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import problemsData from '../data/problems.json';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const ProblemsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');

  const topics = ['All', ...new Set(problemsData.map(p => p.topic))];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  const tags = ['All', ...new Set(problemsData.flatMap(p => p.tags))];

  const filteredProblems = useMemo(() => {
    return problemsData.filter(problem => {
      const searchMatch = problem.title.toLowerCase().includes(searchQuery.toLowerCase());
      const topicMatch = selectedTopic === 'All' || problem.topic === selectedTopic;
      const difficultyMatch = selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;
      const tagMatch = selectedTag === 'All' || problem.tags.includes(selectedTag);
      return searchMatch && topicMatch && difficultyMatch && tagMatch;
    });
  }, [searchQuery, selectedTopic, selectedDifficulty, selectedTag]);

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-5xl font-bold text-center mb-2">Practice Problems</h2>
      <p className="text-lg text-gray-400 text-center mb-12">Sharpen your skills with questions from real quant interviews.</p>
      
      {/* Filter & Search Controls */}
      <div className="max-w-5xl mx-auto flex flex-col gap-4 mb-6">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for a question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 pl-10 text-white focus:ring-accent focus:border-accent"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="topic-filter" className="sr-only">Topic</label>
            <select id="topic-filter" value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white focus:ring-accent focus:border-accent">
              {topics.map(topic => <option key={topic} value={topic}>{topic}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="tag-filter" className="sr-only">Tag</label>
            <select id="tag-filter" value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white focus:ring-accent focus:border-accent">
              {tags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="difficulty-filter" className="sr-only">Difficulty</label>
            <select id="difficulty-filter" value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white focus:ring-accent focus:border-accent">
              {difficulties.map(diff => <option key={diff} value={diff}>{diff}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Problems Table */}
      <div className="max-w-5xl mx-auto bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-700 p-6">
        <div className="grid grid-cols-12 gap-4 px-4 py-3 text-sm font-semibold text-gray-400 border-b border-gray-700">
          <div className="col-span-5">TITLE</div>
          <div className="col-span-2">TOPIC</div>
          <div className="col-span-3">TAGS</div>
          <div className="col-span-2 text-right">DIFFICULTY</div>
        </div>
        <div className="flex flex-col">
          {filteredProblems.map((problem) => (
            <Link
              key={problem.id}
              to={`/problem/${problem.id}`}
              className="grid grid-cols-12 gap-4 px-4 py-4 items-center border-b border-gray-800 hover:bg-gray-800/50 transition-colors text-left"
            >
              <div className="col-span-5 font-semibold text-white">{problem.title}</div>
              <div className="col-span-2 text-gray-300"><span className="bg-gray-700 px-2 py-1 text-xs rounded-md">{problem.topic}</span></div>
              <div className="col-span-3 flex flex-wrap gap-1">
                {problem.tags.map(tag => (
                  <span key={tag} className="bg-sky-900 text-sky-300 px-2 py-1 text-xs rounded-md">{tag}</span>
                ))}
              </div>
              <div className="col-span-2 text-right">
                <span className={`text-sm px-3 py-1 rounded-full font-medium ${
                    problem.difficulty === 'Easy' ? 'bg-green-900 text-green-300' :
                    problem.difficulty === 'Medium' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-red-900 text-red-300'
                }`}>
                    {problem.difficulty}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProblemsPage;
