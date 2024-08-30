import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '../../app/config/env';

export class GoogleGenerativeAIService {
  private model: any;

  constructor() {
    const genAI = new GoogleGenerativeAI(env.API_KEY);
    this.model = genAI.getGenerativeModel({
      model: 'gemini-1.5-pro',
    });
  }

  async generateContent(fileData: any, textPrompt: string): Promise<string> {
    const result = await this.model.generateContent([
      fileData,
      { text: textPrompt },
    ]);

    return result.response.text();
  }
}
