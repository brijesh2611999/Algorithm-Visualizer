import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

const AnimatedHeading = () => {
  return (
    <div>
    <motion.h1
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="text-5xl font-bold text-center font-handwritten text-purple-700 py-12"
    >
      <span className="inline-block">
        <Typewriter
          words={["Welcome To Algorithm Visualizer"]}
          loop={true}
          cursor
          cursorStyle="|"
          typeSpeed={100}
          deleteSpeed={60}
          delaySpeed={20000}
        />
      </span>
    </motion.h1>
    <motion.h1
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="text-4xl font-bold text-center mt font-handwritten text-black py-4"
    >
      <span className="inline-block underline underline-offset-4 decoration-grey">
        <Typewriter
          words={['Sorting Visualizer', 'Pathfinding Visualizer', 'Graph Algorithms']}
          loop={true}
          cursor
          cursorStyle="|"
          typeSpeed={100}
          deleteSpeed={60}
          delaySpeed={8000}
        />
      </span>
    </motion.h1>
    </div>
  );
};

export default AnimatedHeading;
