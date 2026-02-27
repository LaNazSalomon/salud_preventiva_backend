import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { UsuarioSalud } from "../utils/interfaces/usuario";

dotenv.config();

const client = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function generarRecomendacionesService(fromData: UsuarioSalud) {
  const prompt = `
Usuario: ${fromData.nombre}, ${fromData.edad} años.
Actividad física: ${fromData.actividadFisica}.
Horas de sueño: ${fromData.horasSueno}.
Consumo de agua: ${fromData.vasosAgua} vasos/día.
¿Fuma?: ${fromData.fuma}.
Objetivo principal: ${fromData.objetivo}.

Con esta información, da recomendaciones preventivas de salud personalizadas
para optimizar bienestar y reducir riesgos comunes.
Enfócate especialmente en el objetivo principal del usuario: "${fromData.objetivo}".
Requisitos:
- Extensión: entre 200 y 250 palabras (respuesta moderada).
- Estilo: claro, conciso y práctico.
- Organiza en secciones o bullets para que sea fácil de leer.
`;

  const model = client.getGenerativeModel({ model: "gemini-3-flash-preview" });
  const result = await model.generateContent(prompt);

  return result.response.text();
}
