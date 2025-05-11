
export interface VoiceAssistantMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface UseVoiceAssistantOptions {
  onProcessStart?: () => void;
  onProcessEnd?: () => void;
  genZMode?: boolean;
}
