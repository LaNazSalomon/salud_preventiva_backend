import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { UsuarioSalud } from "../utils/interfaces/usuario";

dotenv.config();

const client = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const model = client.getGenerativeModel({ model: "gemini-3-flash-preview" });

function construirContextoUsuario(fromData: UsuarioSalud) {
  return `
Usuario: ${fromData.nombre}, ${fromData.edad} años.
Actividad física: ${fromData.actividadFisica}.
Horas de sueño: ${fromData.horasSueno}.
Consumo de agua: ${fromData.vasosAgua} vasos/día.
¿Fuma?: ${fromData.fuma}.
Objetivo principal: ${fromData.objetivo}.
`;
}

export async function generarRecomendacionesService(fromData: UsuarioSalud) {
  const prompt = `
${construirContextoUsuario(fromData)}

Con esta información, da recomendaciones preventivas de salud personalizadas
para optimizar bienestar y reducir riesgos comunes.
Enfócate especialmente en el objetivo principal del usuario: "${fromData.objetivo}".
Requisitos:
- Extensión: entre 200 y 250 palabras (respuesta moderada).
- Estilo: claro, conciso y práctico.
- Organiza en secciones o bullets para que sea fácil de leer.
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
}

export async function responderPreguntaConContextoService(fromData: UsuarioSalud, pregunta: string) {
  const prompt = `
${construirContextoUsuario(fromData)}

Pregunta del usuario:
"${pregunta}"

Responde en español, de forma clara y accionable, usando el contexto del usuario.
Si aplica, prioriza recomendaciones alineadas al objetivo principal: "${fromData.objetivo}".
Formato:
- Máximo 180 palabras.
- Usa bullets cortos si ayudan.
- No inventes diagnósticos médicos ni reemplaces consulta profesional.
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
