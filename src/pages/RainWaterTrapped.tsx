import { useState } from 'react';
import { motion } from 'framer-motion';

const RainWaterTrapped = () => {
    const [heights, setHeights] = useState([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);
    const [input, setInput] = useState(heights.join(','));
    const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

    // Toggle accordion sections
    const toggleAccordion = (id: string) => {
        setActiveAccordion(activeAccordion === id ? null : id);
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
            <div
                key={index}
                className="flex flex-col items-center"
            >
                {waterHeight > 0 && (
                    <div
                        className="bg-cyan-500/50 border-x border-t border-cyan-600 rounded-t-sm"
                        style={{ height: `${waterHeight * 30}px`, width: '20px' }}
                    />
                )}
                <div
                    className="bg-neutral-800 border border-neutral-900 rounded-b-sm"
                    style={{ height: `${height * 30}px`, width: '20px' }}
                />
                <div className="text-xs text-neutral-600 mt-1">{index}</div>
            </div>
        );
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-100 flex items-center justify-center p-6 font-sans">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-5xl font-black text-center bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-6"
                >
                    Rain Water Trapper
                </motion.h1>

                <div className="mb-6 flex gap-4">
                    <input
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Enter heights (comma-separated)"
                        className="flex-1 px-4 py-2 border-2 border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>

                <div className="flex justify-center space-x-2 mb-6 border-b-2 border-neutral-800 bg-neutral-100 p-4 rounded-lg" style={{ height: `${maxHeight * 30 + 20}px` }}>
                    {bars}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center text-2xl font-semibold text-neutral-700 mb-6"
                >
                    Trapped Water: <span className="text-cyan-600 font-bold">{waterTrapped}</span> units
                </motion.div>

                {/* Explanation Accordions */}
                <div className="space-y-4">
                    {/* Problem Statement Accordion */}
                    <div className="border border-neutral-200 rounded-lg overflow-hidden">
                        <button
                            className="w-full p-4 text-left font-medium bg-neutral-100 hover:bg-neutral-200 flex justify-between items-center"
                            onClick={() => toggleAccordion('problem')}
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-lg">❓</span>
                                <span>Problem Statement</span>
                            </span>
                            <span className="text-lg">{activeAccordion === 'problem' ? '−' : '+'}</span>
                        </button>
                        {activeAccordion === 'problem' && (
                            <div className="p-4 bg-neutral-50 border-t">
                                <p className="mb-2">Given <code>n</code> non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.</p>
                                <pre className="bg-neutral-100 p-3 rounded mt-2 text-sm overflow-x-auto">
                                    {`Input: [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: Water is trapped between buildings`}
                                </pre>
                            </div>
                        )}
                    </div>

                    {/* Solution Approach Accordion */}
                    <div className="border border-neutral-200 rounded-lg overflow-hidden">
                        <button
                            className="w-full p-4 text-left font-medium bg-neutral-100 hover:bg-neutral-200 flex justify-between items-center"
                            onClick={() => toggleAccordion('solution')}
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-lg">💡</span>
                                <span>Solution Approach</span>
                            </span>
                            <span className="text-lg">{activeAccordion === 'solution' ? '−' : '+'}</span>
                        </button>
                        {activeAccordion === 'solution' && (
                            <div className="p-4 bg-neutral-50 border-t">
                                <h3 className="font-semibold mb-3 text-lg">Two Pointer Technique:</h3>
                                <pre className="bg-neutral-100 p-3 rounded text-sm">
                                    {`// Two-pointer approach
let left = 0, right = heights.length - 1;
let leftMax = 0, rightMax = 0, water = 0;

while (left < right) {
  leftMax = Math.max(leftMax, heights[left]);
  rightMax = Math.max(rightMax, heights[right]);
  
  if (leftMax <= rightMax) {
    water += leftMax - heights[left];
    left++;
  } else {
    water += rightMax - heights[right];
    right--;
  }
}`}
                                </pre>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RainWaterTrapped;