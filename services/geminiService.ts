
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Analyze an uploaded image for artistic feedback
export const analyzeImage = async (base64Image: string, mimeType: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          { text: "Analiza este dibujo desde una perspectiva artística. Identifica patrones, áreas de mejora y puntos fuertes. Sé conciso y da feedback constructivo como un coach de arte. El análisis debe ser en español." },
          { inlineData: { mimeType, data: base64Image } }
        ]
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error analyzing image:", error);
    return "Hubo un error al analizar la imagen. Por favor, intenta de nuevo.";
  }
};

// Get complex suggestions with thinking mode
export const getComplexSuggestion = async (base64Image: string, mimeType: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: {
        parts: [
          { text: "Actúa como un profesor de arte experto. Realiza un análisis profundo de este dibujo. Sugiere 3 variantes o ejercicios específicos y detallados para que el artista pueda mejorar, explicando el razonamiento detrás de cada sugerencia. Usa el 'Modo Pensamiento' para dar la respuesta más completa posible. La respuesta debe ser en español." },
          { inlineData: { mimeType, data: base64Image } }
        ]
      },
      config: {
        thinkingConfig: { thinkingBudget: 32768 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error getting complex suggestion:", error);
    return "Hubo un error al generar una sugerencia compleja. Por favor, intenta de nuevo.";
  }
};


// Edit an image based on a text prompt
export const editImage = async (base64Image: string, mimeType: string, prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [
                { inlineData: { data: base64Image, mimeType: mimeType } },
                { text: `Edita esta imagen con la siguiente instrucción: "${prompt}". La respuesta debe ser en español.` },
            ],
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Error editing image:", error);
    throw new Error("No se pudo editar la imagen.");
  }
};

// Generate an image from a text prompt
export const generateImage = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: `Genera una imagen artística basada en esta descripción: "${prompt}". Estilo sketch o ilustración digital.`,
        config: {
            numberOfImages: 1,
            outputMimeType: 'image/png',
            aspectRatio: '1:1',
        },
    });
    
    if (response.generatedImages && response.generatedImages.length > 0) {
      return response.generatedImages[0].image.imageBytes;
    }
    throw new Error("No images were generated.");
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("No se pudo generar la imagen.");
  }
};
