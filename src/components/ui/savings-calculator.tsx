"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, DollarSign, Clock } from "lucide-react";

interface SavingsCalculatorProps {
  className?: string;
}

export const SavingsCalculator: React.FC<SavingsCalculatorProps> = ({ className }) => {
  const [monthlyRevenue, setMonthlyRevenue] = useState(50000);
  const [currentEfficiency, setCurrentEfficiency] = useState(70);

  // Calculate potential savings
  const efficiencyGain = 100 - currentEfficiency;
  const potentialSavings = (monthlyRevenue * efficiencyGain) / 100;
  const annualSavings = potentialSavings * 12;
  const roi = ((annualSavings - 9500) / 9500) * 100;

  return (
    <motion.div
      className={`bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl border border-green-200 dark:border-green-800 p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          ROI Calculator
        </h3>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Monthly Revenue
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="number"
              value={monthlyRevenue}
              onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="50000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Current Efficiency (%)
          </label>
          <input
            type="range"
            min="50"
            max="95"
            value={currentEfficiency}
            onChange={(e) => setCurrentEfficiency(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>50%</span>
            <span>{currentEfficiency}%</span>
            <span>95%</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Savings</p>
          <p className="text-xl font-bold text-green-600 dark:text-green-400">
            ${potentialSavings.toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Annual Savings</p>
          <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
            ${annualSavings.toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-400">ROI</p>
          <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
            {roi.toFixed(0)}%
          </p>
        </motion.div>
      </div>

      <div className="mt-6 p-4 bg-green-100 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <p className="text-sm text-green-800 dark:text-green-200 text-center">
          <strong>Investment pays for itself in just {Math.ceil(9500 / potentialSavings)} months!</strong>
        </p>
      </div>
    </motion.div>
  );
}; 