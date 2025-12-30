import express, { Request, Response } from "express";
import path from "path";

const app = express();
const PORT = 3000;

// middleware para servir archivos estaticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req: Request, res: Response) => {
  // Respondemos con un objeto JSON simple
  res.json({ message: "Servidor funcionando 🚀" });
});

//todos los EndPoint van a ir desde

// Mi primer Endpoint
app.get('/api', (req: Request, res: Response) => {
  console.log ('Aluien accedio al endpoint raz')
  res.json({ saludo: "Hola desde Node.js + Express + TypeScript" });
});

//iniciar el servdor HTTP
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// http://localhost:3000/ >> Hola Mundo! este es un servidor express con TypeSript.
