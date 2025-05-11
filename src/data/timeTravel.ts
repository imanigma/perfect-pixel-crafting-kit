
import { SimulationResult } from "@/types/timeTravel";

export const predefinedScenarios = [
  {
    id: "bitcoin-2013",
    name: "Bitcoin Early Investor",
    description: "What if you invested in Bitcoin in 2013?",
    period: "2013-2023",
    potential_roi: "+10,000%",
    icon: "bitcoin"
  },
  {
    id: "tech-pre-boom",
    name: "Tech Stocks Before Boom",
    description: "What if you invested in tech stocks before the 2010s boom?",
    period: "2010-2023",
    potential_roi: "+500%",
    icon: "boom"
  },
  {
    id: "pre-2008-crash",
    name: "Avoiding the 2008 Crash",
    description: "What if you sold before the 2008 financial crisis?",
    period: "2007-2009",
    potential_roi: "+35%",
    icon: "crash"
  },
  {
    id: "2020-covid-dip",
    name: "COVID Market Dip",
    description: "What if you invested during the COVID market dip?",
    period: "2020-2023",
    potential_roi: "+75%",
    icon: "dollar"
  }
];

// Mock simulation results for specific scenarios
export const mockSimulationResults: Record<string, SimulationResult> = {
  "bitcoin-2013": {
    id: "sim-bitcoin-2013",
    scenarioId: "bitcoin-2013",
    initialInvestment: "$10,000",
    finalValue: "$3,541,600",
    percentageGain: 35316,
    timeSpan: "10 years (2013-2023)",
    chartData: [
      { date: "2013", simulatedValue: 10000, marketValue: 10000 },
      { date: "2014", simulatedValue: 31500, marketValue: 11000 },
      { date: "2015", simulatedValue: 28000, marketValue: 12100 },
      { date: "2016", simulatedValue: 98000, marketValue: 13310 },
      { date: "2017", simulatedValue: 1354000, marketValue: 14641 },
      { date: "2018", simulatedValue: 396000, marketValue: 16105 },
      { date: "2019", simulatedValue: 730000, marketValue: 17716 },
      { date: "2020", simulatedValue: 2854000, marketValue: 19487 },
      { date: "2021", simulatedValue: 4780000, marketValue: 21436 },
      { date: "2022", simulatedValue: 1680000, marketValue: 23579 },
      { date: "2023", simulatedValue: 3541600, marketValue: 25937 }
    ],
    insights: [
      { 
        type: "positive", 
        text: "Bitcoin has been one of the best-performing assets of the last decade, with early investors seeing astronomical returns."
      },
      { 
        type: "neutral", 
        text: "Despite the massive gains, Bitcoin has shown extreme volatility, with several crashes of 80%+ throughout its history."
      },
      { 
        type: "neutral", 
        text: "For perspective, a $10,000 investment in the S&P 500 in 2013 would be worth approximately $25,937 today."
      }
    ],
    events: [
      {
        date: "Apr 2013",
        description: "Initial Investment at ~$130 per Bitcoin",
        impact: 0
      },
      {
        date: "Dec 2013",
        description: "First Bitcoin bubble peak",
        impact: 700
      },
      {
        date: "Dec 2017",
        description: "Bitcoin reaches nearly $20,000",
        impact: 1500
      },
      {
        date: "Mar 2020",
        description: "COVID crash drops Bitcoin below $5,000",
        impact: -60
      },
      {
        date: "Nov 2021",
        description: "All-time high near $69,000",
        impact: 200
      }
    ]
  },
  "2020-covid-dip": {
    id: "sim-2020-covid-dip",
    scenarioId: "2020-covid-dip",
    initialInvestment: "$10,000",
    finalValue: "$17,500",
    percentageGain: 75,
    timeSpan: "3 years (2020-2023)",
    chartData: [
      { date: "Mar 2020", simulatedValue: 10000, marketValue: 10000 },
      { date: "Jun 2020", simulatedValue: 12400, marketValue: 11000 },
      { date: "Dec 2020", simulatedValue: 13800, marketValue: 11500 },
      { date: "Jun 2021", simulatedValue: 14900, marketValue: 12000 },
      { date: "Dec 2021", simulatedValue: 16100, marketValue: 12500 },
      { date: "Jun 2022", simulatedValue: 13500, marketValue: 11000 },
      { date: "Dec 2022", simulatedValue: 14200, marketValue: 11500 },
      { date: "Jun 2023", simulatedValue: 16800, marketValue: 12800 },
      { date: "Dec 2023", simulatedValue: 17500, marketValue: 13200 }
    ],
    insights: [
      { 
        type: "positive", 
        text: "Investing during market downturns often leads to strong returns when the market recovers."
      },
      { 
        type: "neutral", 
        text: "The COVID market dip was one of the fastest crashes and recoveries in market history."
      },
      { 
        type: "neutral", 
        text: "Tech and healthcare stocks performed particularly well after the COVID crash."
      }
    ],
    events: [
      {
        date: "Mar 2020",
        description: "Initial Investment during COVID crash",
        impact: 0
      },
      {
        date: "Apr 2020",
        description: "Strong initial recovery as stimulus announced",
        impact: 24
      },
      {
        date: "Nov 2020",
        description: "Vaccine announcements accelerate gains",
        impact: 15
      },
      {
        date: "Jan 2022",
        description: "Interest rate hikes begin affecting markets",
        impact: -16
      },
      {
        date: "Nov 2023",
        description: "Markets recover as inflation concerns ease",
        impact: 23
      }
    ]
  }
};
