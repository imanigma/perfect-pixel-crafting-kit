import axios from 'axios';
import { toast } from "@/components/ui/sonner";

// Types for our voice assistant service
export interface StockPortfolio {
  stock: string;
  symbol: string;
  percentage: number;
}

export interface TransactionData {
  id: string;
  userId: string;
  companyName: string;
  ticker: string;
  executedAt: string;
  executionPrice: number;
  transactionType: string;
  shares: number;
}

export interface BankData {
  id: string;
  userId: string;
  transactionDate: string;
  amount: number;
  description: string;
  category: string;
  balance: number;
}

// Simulated user ID (in a real app, this would come from authentication)
const USER_ID = "0bf3b550-dc5b-4f3e-91f4-162b687b97c6";

// Mock data - in a real app, this would come from your backend
const mockTradeData: TransactionData[] = [
  {
    id: "1",
    userId: USER_ID,
    companyName: "Apple Inc.",
    ticker: "AAPL",
    executedAt: "2023-05-01",
    executionPrice: 173.50,
    transactionType: "buy",
    shares: 10
  },
  {
    id: "2",
    userId: USER_ID,
    companyName: "Microsoft Corp",
    ticker: "MSFT",
    executedAt: "2023-05-05",
    executionPrice: 332.20,
    transactionType: "buy",
    shares: 5
  },
  {
    id: "3",
    userId: USER_ID,
    companyName: "Amazon.com Inc.",
    ticker: "AMZN",
    executedAt: "2023-05-10",
    executionPrice: 110.45,
    transactionType: "buy",
    shares: 15
  }
];

const mockBankData: BankData[] = [
  {
    id: "b1",
    userId: USER_ID,
    transactionDate: "2023-05-02",
    amount: -1735.00,
    description: "Stock Purchase - AAPL",
    category: "Investment",
    balance: 8265.00
  },
  {
    id: "b2",
    userId: USER_ID,
    transactionDate: "2023-05-06",
    amount: -1661.00,
    description: "Stock Purchase - MSFT",
    category: "Investment",
    balance: 6604.00
  },
  {
    id: "b3",
    userId: USER_ID,
    transactionDate: "2023-05-11",
    amount: -1656.75,
    description: "Stock Purchase - AMZN",
    category: "Investment",
    balance: 4947.25
  }
];

// This would normally be an environment variable
// We're using a mock implementation so no actual API call will be made with this key
const OPENAI_API_KEY = "sk-..."; // This is a placeholder and not a real key

class VoiceAssistantService {
  // Get user data (transactions and bank data)
  async getUserData(): Promise<{ trade: TransactionData[], bank: BankData[] }> {
    // In a real implementation, this would be an API call
    // return axios.get('/api/data').then(response => response.data);
    
    return {
      trade: mockTradeData,
      bank: mockBankData
    };
  }

  // Process audio and get a response
  async processVoiceInput(audioBlob: Blob, pageContext: string, genZMode: boolean = false): Promise<Blob> {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');
      formData.append('page_text', pageContext);
      formData.append('gen_z_mode', genZMode ? 'unhinged' : 'normal');

      // In a real implementation, this would be:
      // const response = await axios.post('/api/voice', formData, {
      //   responseType: 'blob'
      // });
      // return response.data;
      
      // Mock implementation
      // Instead of making an actual API call, we'll use the OpenAI client directly
      const transcribedText = await this.mockTranscription(audioBlob);
      const responseText = await this.mockChatCompletion(transcribedText, pageContext, genZMode);
      
      // For demo purposes, we'll use the browser's built-in speech synthesis
      this.speakResponse(responseText);
      
      // Return a dummy audio blob
      return new Blob(['audio data would be here'], { type: 'audio/mpeg' });
    } catch (error) {
      console.error('Error processing voice input:', error);
      toast.error('Error processing your voice input. Please try again.');
      throw error;
    }
  }

  // Mock transcription (would normally use OpenAI Whisper API)
  private async mockTranscription(audioBlob: Blob): Promise<string> {
    // In a real implementation, we would send this to OpenAI's API
    // For now, we'll just pretend we transcribed something
    const mockTranscriptions = [
      "What's my portfolio performance?",
      "Show me my recent transactions",
      "What stocks should I invest in?",
      "How is the market doing today?"
    ];
    return mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)];
  }

  // Mock chat completion (would normally use OpenAI or Mistral API)
  private async mockChatCompletion(userText: string, pageContext: string, genZMode: boolean): Promise<string> {
    // Different response styles based on mode
    if (genZMode) {
      const genZResponses = [
        "Bruh! Your portfolio is straight-up VIBING! Up 3.2% this week. Apple's carrying the whole team no cap fr fr! 🚀",
        "OMG your trades are giving MAIN CHARACTER ENERGY! Keep that Tesla stock, it's bussin' bussin'! 💯",
        "Lowkey, your bank account is taking an L after that shopping spree. But those tech stocks? BIG W! 🔥"
      ];
      return genZResponses[Math.floor(Math.random() * genZResponses.length)];
    } else {
      const professionalResponses = [
        "Your portfolio has increased by 3.2% over the past week, with Apple showing strong performance at 5.7% growth.",
        "I see you've made three transactions this month. Your most recent purchase was 15 shares of Amazon at $110.45 per share.",
        "Your current account balance is $4,947.25 after recent investment activity."
      ];
      return professionalResponses[Math.floor(Math.random() * professionalResponses.length)];
    }
  }

  // Use browser's speech synthesis
  speakResponse(text: string): void {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = text;
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 1;
      
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        // Try to find a female voice
        const femaleVoice = voices.find(voice => 
          voice.name.includes('Female') || 
          voice.name.includes('Samantha') ||
          voice.name.includes('Google UK English Female')
        );
        
        if (femaleVoice) {
          speech.voice = femaleVoice;
        }
      }
      
      window.speechSynthesis.speak(speech);
    } else {
      console.error('Speech synthesis not supported');
    }
  }

  // Get chart data based on topic
  async getChartData(topic: string): Promise<string> {
    try {
      // In a real implementation:
      // const formData = new FormData();
      // formData.append('topic', topic);
      // const response = await axios.post('/api/plot', formData);
      // return response.data.response;
      
      // Mock implementation
      const chartScripts = [
        `
        const data = [
          { month: 'Jan', value: 1000 },
          { month: 'Feb', value: 1200 },
          { month: 'Mar', value: 900 },
          { month: 'Apr', value: 1500 },
          { month: 'May', value: 1800 },
          { month: 'Jun', value: 2000 }
        ];
        
        // Use Recharts to create a line chart
        return (
          <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#2751B9" />
          </LineChart>
        );
        `,
        `
        const data = [
          { name: 'AAPL', value: 35 },
          { name: 'MSFT', value: 25 },
          { name: 'AMZN', value: 20 },
          { name: 'GOOGL', value: 15 },
          { name: 'META', value: 5 }
        ];
        
        // Use Recharts to create a pie chart
        return (
          <PieChart width={500} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#2751B9"
              dataKey="value"
              label={(entry) => `${entry.name} ${(entry.percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={['#2751B9', '#3962c8', '#6089db', '#87a7e7', '#afc5f0'][index % 5]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );
        `
      ];
      
      return chartScripts[Math.floor(Math.random() * chartScripts.length)];
    } catch (error) {
      console.error('Error getting chart data:', error);
      toast.error('Error generating chart. Please try again.');
      throw error;
    }
  }
}

export const voiceAssistantService = new VoiceAssistantService();
