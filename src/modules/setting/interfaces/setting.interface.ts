export interface Setting {
  id?: string;
  clientId: string;
  chatbotName: string;
  botImage: string;
  welcomeImage: string;
  delayPrompt: string;
  fallbackMessage: string;
  primaryColor: string;
  secondaryColor: string;
  delayTime: number;
  templateSettings: object
}
