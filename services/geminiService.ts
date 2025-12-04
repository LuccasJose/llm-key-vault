import { GoogleGenAI } from "@google/genai";

export const validateGeminiKey = async (apiKey: string): Promise<boolean> => {
  try {
    const ai = new GoogleGenAI({ apiKey });
    // Try a very simple request to validate the key
    await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'ping',
    });
    return true;
  } catch (error) {
    console.error("Key validation failed:", error);
    return false;
  }
};

export const generateGuideForNewKey = async (currentApiKey: string, provider: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: currentApiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Provide a short step-by-step guide on how to get a free API key for ${provider} immediately. Focus on the fastest URL to visit. Format as a bulleted list. Do not include introductory filler text. Respond in English.`,
    });
    return response.text || "Could not obtain guide.";
  } catch (error) {
    return "Error: Could not fetch instructions. Check your master API key.";
  }
};