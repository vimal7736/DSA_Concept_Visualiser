import { motion } from 'framer-motion';

const Home = () => {
  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 10,
        delay: 0.2 
      } 
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.5, 
        ease: 'easeOut', 
        delay: 0.4 
      } 
    },
    hover: { 
      scale: 1.05, 
      transition: { duration: 0.2 } 
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <motion.h1
          className="text-4xl font-extrabold text-gray-800 mb-6"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          Welcome to DSA Visualizer
        </motion.h1>

        <motion.a
          href="/rain-water"
          className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          variants={linkVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          Explore Rain Water Problem
        </motion.a>
      </div>
    </div>
  );
};

export default Home;