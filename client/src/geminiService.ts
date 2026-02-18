
import { GoogleGenerativeAI } from "@google/generative-ai";

export class AIService {
  private ai: GoogleGenerativeAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
      console.warn("Gemini API Key is missing. AI features will be disabled.");
    }
    this.ai = new GoogleGenerativeAI(apiKey || 'dummy-key');
  }

  async getLeadInsights(leadName: string, company: string, currentStatus: string) {
    if (!this.ai || (this.ai as any).apiKey === 'dummy-key') {
      return "AI Insights are disabled. Please configure your GEMINI_API_KEY in client/.env";
    }
    try {
      // The SDK signature might have changed or be different. 
      // Based on error "Uncaught ApiError: API key must be set", the key wasn't passed.
      // Let's assume the previous instantiation fixed the key issue, but we need to use the model correctly.
      // For GoogleGenAI v0.1+, it's getGenerativeModel
      const model = this.ai.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Provide 3 short, actionable sales insights for a lead named ${leadName} at ${company}. Their current status is ${currentStatus}. Focus on conversion strategies and potential pain points. Keep it professional and concise.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("AI Insights Error:", error);
      return "Unable to generate insights at this time. Please try again later.";
    }
  }
}

export const aiService = new AIService();
