
import { toast } from "@/components/ui/sonner";

// This would normally be an environment variable
// We're using a mock implementation so no actual API call will be made with this key
const OPENAI_API_KEY = "sk-..."; // This is a placeholder and not a real key

/**
 * Service to handle text-to-speech functionality
 */
export const speechService = {
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
  },

  // Mock transcription (would normally use OpenAI Whisper API)
  async mockTranscription(audioBlob: Blob): Promise<string> {
    // In a real implementation, we would send this to OpenAI's API
    // For now, we'll just pretend we transcribed something
    const mockTranscriptions = [
      "What's my portfolio performance?",
      "Show me my recent transactions",
      "What stocks should I invest in?",
      "How is the market doing today?",
      "What is the Tesla stock price?"
    ];
    return mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)];
  },

  // Mock chat completion (would normally use OpenAI or Mistral API)
  async mockChatCompletion(userText: string, pageContext: string, genZMode: boolean): Promise<string> {
    // Check if the user is asking for help
    const helpRegex = /^help|what (?:can|could) (?:you|i) (?:do|say|ask)|what (?:are|'re) (?:the|your) (?:commands|features)|how (?:do|can) i use (?:this|you)|(?:show|tell) me (?:the|your) (?:commands|options)/i;
    
    if (helpRegex.test(userText.toLowerCase())) {
      const commands = [
        "• Ask about stock prices (e.g., 'What's the Tesla stock price?')",
        "• Check your portfolio performance",
        "• View recent transactions",
        "• Get stock recommendations",
        "• Check market trends",
        "• Get financial advice",
        "• Ask about specific companies",
        "• Compare different stocks",
        "• Check account balance"
      ];
      
      if (genZMode) {
        return "Yo! Here's what I can do for you: 💯\n\n" + commands.join("\n") + "\n\nJust hit me up with any of these, and I'll hook you up with the deets! No cap!";
      } else {
        return "Here are some commands you can try:\n\n" + commands.join("\n") + "\n\nFeel free to ask me about any of these topics, and I'll assist you with your financial queries.";
      }
    }
    
    // First check specifically for Tesla stock price query since this is a known issue
    if (userText.toLowerCase().includes("tesla") && 
        (userText.toLowerCase().includes("stock price") || userText.toLowerCase().includes("share price"))) {
      if (genZMode) {
        return "Yo! Tesla stock is straight fire right now! 🔥 Trading at $878.45, up 2.3% today. Elon's tweets got the stonks mooning! To the moon! 🚀";
      } else {
        return "Tesla's current stock price is $878.45, which represents a 2.3% increase from yesterday's closing price. The company has shown strong performance this quarter with increased deliveries.";
      }
    }
    
    // Then check for other stock price queries with a more specific regex
    const stockPriceRegex = /what(?:'s| is)(?: the)? ([a-zA-Z\s]+?) (?:stock|share) price/i;
    const stockMatch = userText.match(stockPriceRegex);
    
    if (stockMatch) {
      const stockName = stockMatch[1].trim().toLowerCase();
      
      const stockPrices = {
        "apple": "$187.68",
        "microsoft": "$334.44",
        "amazon": "$146.72",
        "google": "$142.08",
        "meta": "$329.25",
        "tesla": "$878.45"
      };
      
      if (stockPrices[stockName as keyof typeof stockPrices]) {
        const price = stockPrices[stockName as keyof typeof stockPrices];
        if (genZMode) {
          return `${stockName.charAt(0).toUpperCase() + stockName.slice(1)} be hittin' ${price} rn, no cap! That's straight bussin'! 💰`;
        } else {
          return `The current stock price of ${stockName.charAt(0).toUpperCase() + stockName.slice(1)} is ${price}.`;
        }
      }
    }
    
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
};
