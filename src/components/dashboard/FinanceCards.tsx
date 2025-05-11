
import React from "react";
import { FinanceCard } from "./FinanceCard";
import { useNavigate } from "react-router-dom";
import { Brain, BookOpen, Calendar, Clock, History } from "lucide-react";
import { motion } from "framer-motion";

export function FinanceCards() {
  const navigate = useNavigate();

  const handleCardClick = (route: string) => {
    navigate(route);
  };

  const stocksIcon = (
    <svg
      width="50"
      height="50"
      viewBox="0 0 65 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[50px] h-[50px]"
    >
      <rect x="10" y="10" width="45" height="45" rx="10" fill="#FFFFFF"/>
      <path
        d="M27.0069 39.6844C27.0717 40.2329 27.5689 40.625 28.1173 40.5602L37.0551 39.5037C37.6036 39.4389 37.9957 38.9417 37.9308 38.3932C37.866 37.8448 37.3688 37.4527 36.8204 37.5175L28.8757 38.4566L27.9366 30.5119C27.8718 29.9634 27.3746 29.5714 26.8261 29.6362C26.2777 29.701 25.8856 30.1982 25.9504 30.7467L27.0069 39.6844ZM39.1459 25.4331L38.3607 24.8139L27.2147 38.9478L28 39.5671L28.7852 40.1863L39.9311 26.0523L39.1459 25.4331Z"
        fill="#333333"
      ></path>
    </svg>
  );

  const etfIcon = (
    <svg
      width="50"
      height="50"
      viewBox="0 0 65 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[50px] h-[50px]"
    >
      <rect x="10" y="10" width="45" height="45" rx="10" fill="#FFFFFF"/>
      <path
        d="M40 25L32.5 20L25 25M40 25L32.5 30M40 25V35M32.5 30L25 25M32.5 30V40M25 25V35L32.5 40L40 35"
        stroke="#333333"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );

  const cryptoIcon = (
    <svg
      width="50"
      height="50"
      viewBox="0 0 65 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[50px] h-[50px]"
    >
      <rect x="10" y="10" width="45" height="45" rx="10" fill="#FFFFFF"/>
      <path
        d="M32.5 20V32.5M32.5 20L27.5 25M32.5 20L37.5 25M20 32.5H32.5M20 32.5L25 27.5M20 32.5L25 37.5M32.5 45V32.5M32.5 45L27.5 40M32.5 45L37.5 40M45 32.5H32.5M45 32.5L40 27.5M45 32.5L40 37.5"
        stroke="#333333"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );

  const savingsIcon = (
    <svg
      width="50"
      height="50"
      viewBox="0 0 65 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[50px] h-[50px]"
    >
      <rect x="10" y="10" width="45" height="45" rx="10" fill="#FFFFFF"/>
      <path
        d="M20 37.5H25C25 37.5 25 35 27.5 35C30 35 30 37.5 32.5 37.5C35 37.5 35 35 37.5 35C40 35 40 37.5 40 37.5H45M20 37.5V27.5C20 26.3954 20.8954 25.5 22 25.5H43C44.1046 25.5 45 26.3954 45 27.5V37.5M20 37.5V42.5C20 43.6046 20.8954 44.5 22 44.5H43C44.1046 44.5 45 43.6046 45 42.5V37.5"
        stroke="#333333"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );

  const aiAdvisorIcon = <Brain className="w-[50px] h-[50px] text-white" />;
  
  const narrativeIcon = <BookOpen className="w-[50px] h-[50px] text-white" />;
  
  const journeyIcon = <Calendar className="w-[50px] h-[50px] text-white" />;
  
  const timeTravelIcon = <History className="w-[50px] h-[50px] text-white" />;

  // Card animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      }
    }
  };

  return (
    <div className="w-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show" 
        className="flex flex-wrap justify-center items-center"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
          {/* Standard cards */}
          <motion.div variants={itemVariants}>
            <FinanceCard
              title="Stocks"
              description="Commission-free trading"
              icon={stocksIcon}
              onClick={() => handleCardClick('/stocks')}
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <FinanceCard
              title="ETFs"
              description="Global index funds"
              icon={etfIcon}
              onClick={() => handleCardClick('/etfs')}
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <FinanceCard
              title="Crypto"
              description="Digital assets 24/7"
              icon={cryptoIcon}
              onClick={() => handleCardClick('/crypto')}
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <FinanceCard
              title="Savings"
              description="Interest-bearing plans"
              icon={savingsIcon}
              onClick={() => handleCardClick('/savings')}
            />
          </motion.div>
          
          {/* Premium AI cards with enhanced styling */}
          <motion.div variants={itemVariants}>
            <FinanceCard
              title="AI Advisor"
              description="Investment strategies from legendary investors"
              icon={aiAdvisorIcon}
              onClick={() => handleCardClick('/ai-advisor')}
              variant="premium"
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <FinanceCard
              title="Financial Story"
              description="Your finances as engaging narratives"
              icon={narrativeIcon}
              onClick={() => handleCardClick('/financial-narrative')}
              variant="premium"
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <FinanceCard
              title="Finance Journey"
              description="Visualize your daily financial life"
              icon={journeyIcon}
              onClick={() => handleCardClick('/finance-journey')}
              variant="premium"
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <FinanceCard
              title="Time Travel"
              description="Explore alternate investment realities"
              icon={timeTravelIcon}
              onClick={() => handleCardClick('/time-travel')}
              variant="premium"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
