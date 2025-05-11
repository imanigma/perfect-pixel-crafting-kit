
interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
  length: number;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onnomatch: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

interface SpeechSynthesisUtterance extends EventTarget {
  lang: string;
  onboundary: ((this: SpeechSynthesisUtterance, ev: Event) => any) | null;
  onend: ((this: SpeechSynthesisUtterance, ev: Event) => any) | null;
  onerror: ((this: SpeechSynthesisUtterance, ev: Event) => any) | null;
  onmark: ((this: SpeechSynthesisUtterance, ev: Event) => any) | null;
  onpause: ((this: SpeechSynthesisUtterance, ev: Event) => any) | null;
  onresume: ((this: SpeechSynthesisUtterance, ev: Event) => any) | null;
  onstart: ((this: SpeechSynthesisUtterance, ev: Event) => any) | null;
  pitch: number;
  rate: number;
  text: string;
  voice: SpeechSynthesisVoice | null;
  volume: number;
}

interface SpeechSynthesisVoice {
  default: boolean;
  lang: string;
  localService: boolean;
  name: string;
  voiceURI: string;
}

interface SpeechSynthesis {
  onvoiceschanged: ((this: SpeechSynthesis, ev: Event) => any) | null;
  paused: boolean;
  pending: boolean;
  speaking: boolean;
  cancel(): void;
  pause(): void;
  resume(): void;
  speak(utterance: SpeechSynthesisUtterance): void;
  getVoices(): SpeechSynthesisVoice[];
}

interface Window {
  SpeechRecognition: new () => SpeechRecognition;
  webkitSpeechRecognition: new () => SpeechRecognition;
  speechSynthesis: SpeechSynthesis;
  SpeechSynthesisUtterance: new () => SpeechSynthesisUtterance;
}
