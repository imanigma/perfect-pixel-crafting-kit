
import axios from 'axios';
import { toast } from "@/components/ui/sonner";

// Create axios instance for the Python backend
const pythonApi = axios.create({
  // This will be replaced with your actual Python backend URL
  baseURL: import.meta.env.VITE_PYTHON_BACKEND_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Add timeout for better error handling
});

// Error handling interceptor
pythonApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Failed to connect to Python backend';
    toast.error(message);
    return Promise.reject(error);
  }
);

// Example functions to interact with your Python backend
export const pythonBackendService = {
  /**
   * Generic GET request to Python backend
   */
  async get<T>(endpoint: string): Promise<T> {
    const response = await pythonApi.get<T>(endpoint);
    return response.data;
  },

  /**
   * Generic POST request to Python backend
   */
  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await pythonApi.post<T>(endpoint, data);
    return response.data;
  },

  /**
   * Check if the Python backend is available
   */
  async checkConnection(): Promise<boolean> {
    try {
      // You should implement a simple health-check endpoint in your Python backend
      await pythonApi.get('/health-check', { timeout: 3000 });
      return true;
    } catch (error) {
      console.error('Python backend connection failed:', error);
      return false;
    }
  },

  /**
   * Example function - replace with your actual API endpoints
   * Get financial data from Python backend
   */
  async getFinancialData() {
    try {
      return await this.get('/api/financial-data');
    } catch (error) {
      console.error('Failed to fetch financial data:', error);
      throw error;
    }
  },

  /**
   * Example function - replace with your actual API endpoints
   * Process user input with Python backend
   */
  async processUserInput(userInput: string) {
    try {
      return await this.post('/api/process', { input: userInput });
    } catch (error) {
      console.error('Failed to process user input:', error);
      throw error;
    }
  }
};
