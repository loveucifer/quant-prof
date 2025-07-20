import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroBackground from '../components/common/HeroBackground';
import QuantMatrix from '../components/common/QuantMatrix'; // Import the new matrix

const Button = ({ children, onClick, variant = 'primary' }) => {
  const baseClasses = "font-semibold tracking-wider text-sm py-3 px-10 rounded-md transition-all duration-300";
  const styles = {
    primary: 'bg-accent text-primary hover:shadow-glow',
    secondary: 'bg-transparent text-accent border border-accent hover:bg-accent/10'
  };
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseClasses} ${styles[variant]}`}
    >
      {children}
    </motion.button>
  );
};

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center text-center container mx-auto px-4">
      {/* Layer 1: The particle background */}
      <HeroBackground />
      {/* Layer 2: The new digital rain effect */}
      <QuantMatrix />

      {/* Layer 3: The main content, with a semi-transparent background to ensure readability */}
      <main className="z-20">
        <motion.h1 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-bold mb-4 text-white leading-tight tracking-tight"
        >
          Unlock the Markets with <span className="text-accent">Quantitative</span> Insight
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto font-light"
        >
          QuantProf provides the tools and knowledge to navigate the complexities of modern finance. Elevate your skills from theory to practice.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex justify-center items-center flex-wrap gap-4"
        >
          <Button onClick={() => navigate('/games')} variant="primary">Explore Games</Button>
          <Button onClick={() => navigate('/courses')} variant="secondary">View Courses</Button>
        </motion.div>
      </main>
    </div>
  );
};

export default HomePage;