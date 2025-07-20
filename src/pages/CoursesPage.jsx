import { motion } from 'framer-motion';
import { LockClosedIcon, PlayCircleIcon } from '@heroicons/react/24/solid';

// Mock data updated with thumbnail URLs from placehold.co
const courses = [
  {
    title: 'Algorithmic Trading A-Z',
    description: 'Learn to build, backtest, and deploy quantitative trading strategies using Python.',
    price: '$499',
    level: 'Intermediate',
    thumbnail: 'https://placehold.co/600x400/000000/00FF6A?text=Algo+Trading'
  },
  {
    title: 'Advanced Options Theory',
    description: 'A deep dive into the greeks, volatility surfaces, and exotic option pricing.',
    price: '$799',
    level: 'Advanced',
    thumbnail: 'https://placehold.co/600x400/000000/00FF6A?text=Options+Theory'
  },
  {
    title: 'Machine Learning for Finance',
    description: 'Apply modern ML techniques like LSTMs and Gradient Boosting to financial datasets.',
    price: '$699',
    level: 'Advanced',
    thumbnail: 'https://placehold.co/600x400/000000/00FF6A?text=ML+for+Finance'
  }
];

const CourseCard = ({ title, description, price, level, thumbnail }) => (
  <motion.div
    whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0, 255, 106, 0.1), 0 8px 10px -6px rgba(0, 255, 106, 0.1)' }}
    className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-green-900/30 flex flex-col overflow-hidden"
  >
    <div className="relative group">
      <img src={thumbnail} alt={title} className="w-full h-48 object-cover"/>
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <PlayCircleIcon className="h-16 w-16 text-accent"/>
      </div>
    </div>
    <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold bg-accent/10 text-accent px-3 py-1 rounded-full">{level}</span>
            <span className="text-2xl font-bold text-white">{price}</span>
        </div>
        <h3 className="text-xl font-bold text-accent mb-3 flex-grow">{title}</h3>
        <p className="text-gray-400 mb-6 text-sm">{description}</p>
        <button className="mt-auto w-full flex items-center justify-center gap-2 bg-accent text-primary font-bold tracking-wider text-sm py-3 px-10 rounded-md transition-all duration-300 hover:shadow-glow">
            <LockClosedIcon className="h-5 w-5" />
            Enroll Now
        </button>
    </div>
  </motion.div>
);

const CoursesPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-5xl font-bold text-center mb-12">All Courses</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
