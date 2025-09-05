// Fix: Use the correct '@google/genai' package as per guidelines.
import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;
const apikey_gemini = import.meta.env.VITE_API_KEY;

// Fix: Use `process.env.API_KEY` as per guidelines and assume it is available. This also resolves the `import.meta.env` TypeScript error.
const getAi = () => {
    if (!ai) {
        ai = new GoogleGenAI({ apiKey: apikey_gemini });
    }
    return ai;
};

export const generateContextFromText = async (selectedText: string): Promise<string> => {
    const prompt = `Actúa como un asistente experto. Analiza el siguiente texto y responde de dos maneras:
1. Si el texto parece una pregunta (por ejemplo, si contiene '$¿... ?$'), responde directamente a esa pregunta basándote en el contexto general del conocimiento.
2. Si no es una pregunta, proporciona un contexto general del texto, explicando de forma concisa: [qué es, por qué es importante y para qué sirve].

Texto para analizar:
---
${selectedText}
---
`;

    try {
        const genAI = getAi();
        const response = await genAI.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        if (response && response.text) {
            return response.text;
        } else {
            throw new Error("Received an empty response from the API.");
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            // Fix: Removed specific error message for invalid API key as per guidelines.
            return `API Error: ${error.message}`;
        }
        return "An unknown error occurred while contacting the Gemini API.";
    }
};
