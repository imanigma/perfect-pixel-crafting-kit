
import axios from 'axios';
import * as cheerio from 'cheerio';

export interface StockPortfolio {
  stock: string;
  symbol: string;
  percentage: number;
}

// Function to scrape Warren Buffett's portfolio from the CNBC page
export async function getWarrenBuffettPortfolio(): Promise<StockPortfolio[]> {
  const url = 'https://www.cnbc.com/berkshire-hathaway-portfolio/';

  try {
    // Fetch the HTML content of the page
    const { data } = await axios.get(url);

    // Load the HTML into cheerio
    const $ = cheerio.load(data);

    // Array to hold the portfolio data
    const portfolio: StockPortfolio[] = [];

    // Assuming the portfolio items are within <div class="table__row"> elements
    $('.table__row').each((index, element) => {
      const stock = $(element).find('.symbol').text().trim();
      const percentageStr = $(element).find('.percent').text().trim();

      // Extract the percentage and convert it to a number
      const percentage = parseFloat(percentageStr.replace('%', '').trim());

      // Only add valid entries to the portfolio array
      if (stock && !isNaN(percentage)) {
        portfolio.push({
          stock,
          symbol: stock, // Using the stock name as the symbol
          percentage,
        });
      }
    });

    return portfolio;
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return [];
  }
}

// Function to calculate investment based on portfolio data
export function calculateInvestment(amount: number, portfolio: StockPortfolio[]): { stock: string; investment: number }[] {
  return portfolio.map((stock) => {
    const investment = (stock.percentage / 100) * amount;
    return { stock: stock.stock, investment };
  });
}
