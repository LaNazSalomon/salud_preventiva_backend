import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import recomendacionesRouter from "./routes/recomendaciones";

dotenv.config();
const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use("/api", recomendacionesRouter);

app.listen(port, () => {
  console.log(`Servidor con IA corriendo en http://localhost:${port}`);
});
