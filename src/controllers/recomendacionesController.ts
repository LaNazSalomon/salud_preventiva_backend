import { Request, Response } from "express";
import { generarRecomendacionesService, responderPreguntaConContextoService } from "../services/googleService";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UsuarioPreguntaDTO, UsuarioSaludDTO } from "../dtos/usuario.from.dto";

export async function generarRecomendaciones(req: Request, res: Response) {
  const formData = plainToInstance(UsuarioSaludDTO, req.body);

  const errors = await validate(formData);
  if (errors.length > 0) {
    // Extraer solo los mensajes de error personalizados
    const mensajes = errors
      .map(err => Object.values(err.constraints || {}))
      .flat();

    return res.status(400).json({
      error: "Datos inválidos",
      detalles: mensajes
    });
  }

  try {
    const recomendaciones = await generarRecomendacionesService(formData);
    res.json({ recomendaciones });
  } catch (error) {
    console.error("Error Google AI:", error);
    res.status(500).json({ error: "Error al obtener recomendaciones de IA" });
  }
}

export async function responderPreguntaChat(req: Request, res: Response) {
  const formData = plainToInstance(UsuarioPreguntaDTO, req.body);

  const errors = await validate(formData);
  if (errors.length > 0) {
    const mensajes = errors
      .map(err => Object.values(err.constraints || {}))
      .flat();

    return res.status(400).json({
      error: "Datos inválidos",
      detalles: mensajes
    });
  }

  try {
    const respuesta = await responderPreguntaConContextoService(formData, formData.pregunta);
    res.json({ respuesta });
  } catch (error) {
    console.error("Error Google AI (chat):", error);
    res.status(500).json({ error: "Error al responder la pregunta con IA" });
  }
}