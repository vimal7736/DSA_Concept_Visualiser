import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const RainWaterTrapped = () => {
  const [heights, setHeights] = useState<number[]>([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);
  const [input, setInput] = useState<string>(heights.join(','));
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  // Toggle accordion sections
  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, delay: 0.2 } },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.4 } },
  };

  const barVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: i * 0.1 },
    }),
  };

  const resultVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.6 } },
  };

  // Calculate trapped water using two-pointer technique
  const calculateTrappedWater = (arr: number[]): number => {
    let left = 0;
    let right = arr.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let water = 0;

    while (left < right) {
      leftMax = Math.max(leftMax, arr[left]);
      rightMax = Math.max(rightMax, arr[right]);
      if (leftMax <= rightMax) {
        water += leftMax - arr[left];
        left++;
      } else {
        water += rightMax - arr[right];
        right--;
      }
    }
    return water;
  };

  const waterTrapped = calculateTrappedWater(heights);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    const newHeights = value.split(',').map(Number).filter(n => !isNaN(n) && n >= 0);
    setHeights(newHeights);
  };

  // Visualization: Generate bars and water
  const maxHeight = Math.max(...heights, 3);
  const bars = heights.map((height, index) => {
    const waterHeight = Math.min(
      Math.max(...heights.slice(0, index + 1)),
      Math.max(...heights.slice(index))
    ) - height;
    return (
      <motion.div
        key={index}
        className="flex flex-col items-center"
        custom={index}
        variants={barVariants}
        initial="hidden"
        animate="visible"
      >
        {waterHeight > 0 && (
          <div
            className="bg-blue-400 rounded-t-sm"
            style={{ height: `${waterHeight * 20}px`, width: '24px' }}
          />
        )}
        <div
          className="bg-gray-700 rounded-b-sm"
          style={{ height: `${height * 20}px`, width: '24px' }}
        />
        <div className="text-xs mt-1">{index}</div>
      </motion.div>
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-100 to-blue-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-4xl w-full">
        {/* Animated Title */}
        <motion.h1
          className="text-4xl font-extrabold text-gray-800 mb-6 text-center"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          Trapping Rain Water
        </motion.h1>

        {/* Description */}
        <p className="mb-6 text-gray-600 text-center">
          Enter building heights to see how much water can be trapped in valleys after it rains.
        </p>

        {/* Animated Input Section */}
        <motion.div
          className="mb-8 flex flex-col sm:flex-row gap-4"
          variants={inputVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Heights (comma-separated):
            </label>
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="e.g., 0,1,0,2,1,0,1,3,2,1,2,1"
              className="w-full"
            />
          </div>
          <Button
            onClick={() => setHeights(input.split(',').map(Number).filter(n => !isNaN(n) && n >= 0))}
            className="bg-blue-600 hover:bg-blue-700 text-white mt-6 sm:mt-0"
          >
            Update
          </Button>
        </motion.div>

        {/* Visualization Area */}
        <div className="flex justify-center space-x-2 mb-8 border-b-4 border-gray-800 bg-gray-50 p-4 rounded-lg" style={{ height: `${maxHeight * 20 + 20}px` }}>
          {bars}
        </div>

        {/* Result Display */}
        <motion.p
          className="text-lg text-gray-700 font-semibold text-center mb-8"
          variants={resultVariants}
          initial="hidden"
          animate="visible"
        >
          Total water trapped: <span className="text-blue-600 font-bold">{waterTrapped}</span> units
        </motion.p>

        {/* Explanation Accordion */}
        <div className="space-y-4">
          {/* Problem Statement Accordion */}
          <motion.div 
            className="border rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <button
              className="w-full p-4 text-left font-medium bg-gray-500 hover:bg-gray-600 flex justify-between items-center"
              onClick={() => toggleAccordion('problem')}
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">❓</span>
                <span>Problem Statement</span>
              </span>
              <span className="text-lg">{activeAccordion === 'problem' ? '−' : '+'}</span>
            </button>
            {activeAccordion === 'problem' && (
              <div className="p-4 bg-gray-500 border-t">
                <p className="mb-2">Given <code>n</code> non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.</p>
                <p className="mb-2">Example:</p>
                <pre className="bg-gray-500 p-3 rounded mt-2 text-sm overflow-x-auto">
                  {`Input: [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The elevation map is represented by the gray bars.
The blue bars represent the trapped water.`}
                </pre>
                <div className="mt-3 p-3 bg-blue-50 text-gray-700 rounded border border-blue-100">
                  <p className="font-medium text-blue-800">Visualization Key:</p>
                  <div className="flex items-center mt-2 gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-700 rounded-sm"></div>
                      <span>Buildings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-400 rounded-sm"></div>
                      <span>Trapped Water</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Solution Approach Accordion */}
          <motion.div 
            className="border rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <button
              className="w-full p-4 text-left font-medium bg-gray-500 hover:bg-gray-500 flex justify-between items-center"
              onClick={() => toggleAccordion('solution')}
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">💡</span>
                <span>Solution Approach</span>
              </span>
              <span className="text-lg">{activeAccordion === 'solution' ? '−' : '+'}</span>
            </button>
            {activeAccordion === 'solution' && (
              <div className="p-4 bg-gray-400 border-t">
                <h3 className="font-semibold mb-3 text-lg">Two Pointer Technique (O(n) time, O(1) space):</h3>
                <ol className="list-decimal pl-5 space-y-3">
                  <li className="font-medium">Initialize pointers and max variables:
                    <pre className="bg-gray-600 p-2 rounded mt-1 text-sm">
                      {`let left = 0;
let right = heights.length - 1;
let leftMax = 0;
let rightMax = 0;
let water = 0;`}
                    </pre>
                  </li>
                  <li className="font-medium">While left &lt; right:
                    <ul className="list-disc pl-5 mt-2 space-y-2">
                      <li>Update leftMax and rightMax with current heights</li>
                      <li>If leftMax ≤ rightMax:
                        <ul className="list-[circle] pl-5 mt-1 space-y-1">
                          <li>Water at current left = leftMax - height[left]</li>
                          <li>Add to total water</li>
                          <li>Move left pointer right</li>
                        </ul>
                      </li>
                      <li>Else:
                        <ul className="list-[circle] pl-5 mt-1 space-y-1">
                          <li>Water at current right = rightMax - height[right]</li>
                          <li>Add to total water</li>
                          <li>Move right pointer left</li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ol>
                <div className="mt-4 p-3 bg-blue-500 rounded border border-blue-200">
                  <p className="font-medium text-blue-800">Key Insight:</p>
                  <p className="mt-1">The amount of water trapped at any point depends on the minimum of the highest bars on both sides minus the current height.</p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Visualization Guide Accordion */}
          <motion.div 
            className="border rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <button
              className="w-full p-4 text-left font-medium bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
              onClick={() => toggleAccordion('visualization')}
            >
              <span className="flex items-center gap-2 text-gray-900">
                <span className="text-lg">👀</span>
                <span>Visualization Guide</span>
              </span>
              <span className="text-lg">{activeAccordion === 'visualization' ? '−' : '+'}</span>
            </button>
            {activeAccordion === 'visualization' && (
              <div className="p-4 bg-white text-gray-800 border-t">
                <h3 className="font-semibold mb-2">How to Read the Visualization:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center mt-1">
                      <div className="w-5 h-5 bg-gray-700 rounded-sm"></div>
                    </div>
                    <div>
                      <p className="font-medium">Gray Bars</p>
                      <p className="text-sm text-gray-600">Represent buildings with heights corresponding to your input values</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center mt-1">
                      <div className="w-5 h-5 bg-blue-400 rounded-sm"></div>
                    </div>
                    <div>
                      <p className="font-medium">Blue Bars</p>
                      <p className="text-sm text-gray-600">Show trapped water between buildings</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center mt-1">
                      <div className="w-5 h-5 border border-gray-400 rounded-sm"></div>
                    </div>
                    <div>
                      <p className="font-medium">Numbers Below Bars</p>
                      <p className="text-sm text-gray-600">Indicate the index position in the array</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
                  <p className="font-medium text-yellow-800">Try This Example:</p>
                  <p className="text-sm mt-1">Input <code>4,2,0,3,2,5</code> to see a different water trapping pattern</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RainWaterTrapped;