import { motion } from 'framer-motion';
import { 
  BeakerIcon, 
  ChartBarIcon, 
  CodeBracketIcon 
} from '@heroicons/react/24/solid';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.2 
      } 
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 10
      } 
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        type: 'spring',
        stiffness: 200,
        damping: 10
      } 
    },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 } 
    }
  };

  const projectLinks = [
    {
      href: "/rain-water",
      icon: BeakerIcon,
      title: "Rain Water Trapper",
      description: "Visualize water trapping algorithm"
    },
    {
    //   href: "/graph-algo",
      icon: ChartBarIcon,
      title: "Graph Algorithms",
      description: "Explore path finding & traversal"
    },
    {
    //   href: "/code-challenges",
      icon: CodeBracketIcon,
      title: "Coding Challenges",
      description: "Practice DSA problems"
    }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-green-500 via-purple-500 to-pink-900 flex items-center justify-center p-6 font-['Manrope']"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-2xl w-full">
        <motion.h1
          className="text-5xl font-black text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8"
          variants={titleVariants}
        >
          DSA Visualizer
        </motion.h1>

        <p className="text-center text-neutral-600 mb-10 text-lg">
          Interactive platform to explore Data Structures and Algorithms through visual representations
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {projectLinks.map((project, index) => (
            <motion.a
              key={project.href}
              href={project.href}
              className="block bg-white border border-neutral-200 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 group"
              variants={cardVariants}
              whileHover="hover"
              initial="hidden"
              animate="visible"
            >
              <project.icon className="mx-auto mb-4 w-12 h-12 text-indigo-600 group-hover:text-purple-600 transition-colors" />
              <h3 className="text-xl font-bold mb-2 text-neutral-800 group-hover:text-indigo-700 transition-colors">
                {project.title}
              </h3>
              <p className="text-neutral-500 text-sm">
                {project.description}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Home;