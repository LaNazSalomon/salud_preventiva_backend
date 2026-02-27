import { Router } from "express";
import { generarRecomendaciones, responderPreguntaChat } from "../controllers/recomendacionesController";

const router = Router();

router.post("/recomendaciones", generarRecomendaciones);
router.post("/recomendaciones/chat", responderPreguntaChat);

export default router;
