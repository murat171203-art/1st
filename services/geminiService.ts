
import { GoogleGenAI, Type, Chat } from "@google/genai";
import { Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeDocument = async (fileName: string, options: string[], comment: string, language: Language) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `You are an expert academic consultant at ManasPrint.
      A student has uploaded a file: "${fileName}".
      Requested Services: ${options.join(', ')}.
      Student Notes: "${comment}".

      Provide a 3-sentence expert "pre-analysis" in ${language}:
      1. Acknowledge the document type (e.g., thesis, essay, report) based on the filename.
      2. Mention one specific thing we will focus on (e.g., APA formatting, grammar consistency, or layout cleanup).
      3. A supportive closing statement.
      Keep the tone professional yet student-friendly.`,
      config: {
        systemInstruction: `You are an academic advisor. Language: ${language}. Response must be concise and purely text.`,
        temperature: 0.8,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    const fallbacks = {
      [Language.KY]: "Файлыңыз кабыл алынды. Биздин адистер аны жакында текшерип чыгышат.",
      [Language.TR]: "Dosyanız başarıyla alındı. Uzmanlarımız en kısa sürede inceleyecektir.",
      [Language.RU]: "Ваш файл принят. Наши специалисты скоро приступят к проверке.",
      [Language.EN]: "File received. Our experts will start the review process shortly."
    };
    return fallbacks[language] || "Error processing request.";
  }
};

export const createChatSession = (language: Language): Chat => {
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are "PrintBot", the official AI assistant for ManasPrint. 
      Services: 
      - Standard Printing: B&W 5 KGS, Color 10 KGS.
      - KTMU Title Pages: Standard (5/10 KGS), Custom with faculty/topic details (25/35 KGS).
      - Grammar Check: 2 KGS per page.
      - Formatting: Coursework (200 KGS), Thesis (500 KGS).
      Locations: 
      - G-Block (Ж блок): 07:30 - 19:00.
      - Philharmony: 10:00 - 17:00.
      - KOMOK: 08:00 - 20:00.
      
      Your goal is to help students with questions about prices, locations, and how to place orders. 
      Respond in ${language}. Be helpful, polite, and brief. Use emojis where appropriate.`,
      temperature: 0.7,
    },
  });
};
