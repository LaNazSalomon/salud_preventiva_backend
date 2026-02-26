import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const client = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

console.log("Google AI Client inicializado con clave:", process.env.GOOGLE_API_KEY);

export async function obtenerRecomendaciones(prompt: string) {
  const model = client.getGenerativeModel({ model: "gemini-3-flash-preview" });
  const result = await model.generateContent(prompt);
  console.log("Respuesta Google AI:", result.response.text());
  return result.response.text();
}