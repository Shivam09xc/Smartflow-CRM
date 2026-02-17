
import { GoogleGenAI } from "@google/genai";

export class AIService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getLeadInsights(leadName: string, company: string, currentStatus: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Provide 3 short, actionable sales insights for a lead named ${leadName} at ${company}. Their current status is ${currentStatus}. Focus on conversion strategies and potential pain points. Keep it professional and concise.`,
        config: {
          temperature: 0.7,
        }
      });
      return response.text;
    } catch (error) {
      console.error("AI Insights Error:", error);
      return "Unable to generate insights at this time. Please try again later.";
    }
  }
}

export const aiService = new AIService();
