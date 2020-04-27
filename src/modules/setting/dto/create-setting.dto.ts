export class CreateSettingDto {
  readonly clientId: string;
  readonly chatbotName: string;
  readonly botImage: string;
  readonly welcomeImage: string;
  readonly delayPrompt: string;
  readonly fallbackMessage: string;
  readonly primaryColor: string;
  readonly secondaryColor: string;
  readonly delayTime: number;
  readonly templateSettings: object;
}
