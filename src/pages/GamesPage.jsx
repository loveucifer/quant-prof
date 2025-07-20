import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Custom SVG Icons for a consistent, clean look
const ArithmeticIcon = () => (
  <svg className="h-12 w-12 text-accent mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16M8 4v16m8-16v16" /></svg>
);
const ArithmeticProIcon = () => (
  <svg className="h-12 w-12 text-accent mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v18M19 3v18M3 5h18M3 19h18M9 9l6 6m0-6l-6 6" /></svg>
);
const SequenceIcon = () => (
  <svg className="h-12 w-12 text-accent mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12l4-4m-4 4l4 4" /></svg>
);

const games = [
    { 
      title: 'Arithmetic Game', 
      description: 'Test your mental math speed against the clock with single-step problems.',
      path: '/games/arithmetic',
      icon: <ArithmeticIcon />
    },
    { 
      title: 'Arithmetic Pro', 
      description: 'Challenge yourself with complex, multi-step calculations.',
      path: '/games/arithmetic-pro',
      icon: <ArithmeticProIcon />
    },
    { 
      title: 'Sequence Game', 
      description: 'Find the next number in the sequence.',
      path: '/games/sequence',
      icon: <SequenceIcon />
    },
];

const GameCard = ({ title, description, path, icon }) => (
  <Link to={path} className="block">
    <motion.div
      whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0, 255, 106, 0.1), 0 8px 10px -6px rgba(0, 255, 106, 0.1)' }}
      className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border border-green-900/30 cursor-pointer flex flex-col items-center text-center h-full"
    >
      {icon}
      <h3 className="text-2xl font-bold text-accent mb-3 flex-grow">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  </Link>
);

const GamesPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-5xl font-bold text-center mb-12">Our Games</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {games.map((game, index) => (
          <GameCard key={index} {...game} />
        ))}
      </div>
    </div>
  );
};

export default GamesPage;
