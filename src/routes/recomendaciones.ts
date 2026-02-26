import { Router } from "express";
import { generarRecomendaciones } from "../controllers/recomendacionesController";

const router = Router();

router.post("/recomendaciones", generarRecomendaciones);

export default router;
