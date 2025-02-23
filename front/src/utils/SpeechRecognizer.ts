interface SpeechRecognitionEvent extends Event {
  readonly results: SpeechRecognitionResultList;
  readonly resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}

declare var SpeechRecognition: {
  prototype: SpeechRecognition;
  new (): SpeechRecognition;
};

interface SpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

class SpeechRecognizer {
  private recognition: SpeechRecognition;
  private finalTranscript = '';
  private resolveTranscript?: (transcript: string) => void;

  constructor(lang: string = 'fr-FR') {
    const SpeechRecognitionImpl =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionImpl) {
      throw new Error(
        'La reconnaissance vocale n’est pas supportée par ce navigateur.',
      );
    }
    this.recognition = new SpeechRecognitionImpl();
    this.recognition.lang = lang;
    this.recognition.interimResults = true;
    this.recognition.continuous = true;
    this.recognition.maxAlternatives = 1;
  }

  start(): Promise<string> {
    this.finalTranscript = '';

    return new Promise((resolve, reject) => {
      this.resolveTranscript = resolve;

      this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            this.finalTranscript += result[0].transcript + ' ';
          }
        }
      };

      this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        return reject(
          new Error(`Erreur de reconnaissance vocale: ${event.error}`),
        );
      };

      this.recognition.onend = () => {
        if (this.resolveTranscript) {
          this.resolveTranscript(this.finalTranscript.trim());
        }
      };

      try {
        this.recognition.start();
      } catch (error) {
        return reject(error);
      }
    });
  }

  stop(): void {
    this.recognition.stop();
  }
}

export default new SpeechRecognizer();
