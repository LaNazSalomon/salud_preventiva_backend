import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import recomendacionesRouter from "./routes/recomendaciones";

dotenv.config();
const app = express();
const port = 4000;
const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:5173";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", frontendUrl);
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(bodyParser.json());
app.use("/api", recomendacionesRouter);

app.listen(port, () => {
  console.log(`Servidor con IA corriendo en http://localhost:${port}`);
});
