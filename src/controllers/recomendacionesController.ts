import { Request, Response } from "express";
import { obtenerRecomendaciones } from "../services/huggingfaceService";

export async function generarRecomendaciones(req: Request, res: Response) {
  const { edad, habitos } = req.body;
  const prompt = `Usuario con ${edad} años, hábitos: ${habitos}.
  Da recomendaciones para prevenir enfermedades comunes.`;

  try {
    const recomendaciones = await obtenerRecomendaciones(prompt);
    res.json({ recomendaciones });
  } catch (error) {
    console.error("Error Google AI:", error);
    res.status(500).json({ error: "Error al obtener recomendaciones de IA" });
  }
}