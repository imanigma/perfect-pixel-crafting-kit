
import axios from 'axios';
import { toast } from "@/components/ui/sonner";

// Create axios instance for the Python backend
const pythonApi = axios.create({
  // This will be replaced with your actual Python backend URL
  baseURL: import.meta.env.VITE_PYTHON_BACKEND_URL || 'http://localhost:8078',
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
      // Use the health-check endpoint
      await pythonApi.get('/health-check', { timeout: 3000 });
      return true;
    } catch (error) {
      console.error('Python backend connection failed:', error);
      return false;
    }
  },

  /**
   * Get financial data from Python backend
   */
  async getFinancialData() {
    try {
      return await this.get('/data');
    } catch (error) {
      console.error('Failed to fetch financial data:', error);
      throw error;
    }
  },

  /**
   * Process user input with Python backend
   */
  async processUserInput(userInput: string) {
    try {
      return await this.post('/plot', { topic: userInput });
    } catch (error) {
      console.error('Failed to process user input:', error);
      throw error;
    }
  },

  /**
   * Process voice input through the backend
   */
  async processVoiceInput(audioBlob: Blob, pageContext: string, genZMode: boolean = false): Promise<Blob> {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');
      formData.append('page_text', pageContext);
      formData.append('gen_z_mode', genZMode ? 'unhinged' : 'normal');

      const response = await axios.post(`${pythonApi.defaults.baseURL}/voice`, formData, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      return response.data;
    } catch (error) {
      console.error('Failed to process voice input:', error);
      toast.error('Failed to process voice input. Check server connection.');
      throw error;
    }
  },

  /**
   * Generate a chart based on the given topic
   */
  async getChartData(topic: string): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('topic', topic);
      
      const response = await axios.post(`${pythonApi.defaults.baseURL}/plot`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      
      return response.data.response;
    } catch (error) {
      console.error('Failed to generate chart data:', error);
      toast.error('Failed to generate chart. Try again later.');
      throw error;
    }
  }
};
