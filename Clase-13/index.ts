import express, { Request, Response } from "express";
import path from "path";

const app = express();
const PORT = 3000;

// middleware para servir archivos estaticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "..", "public")));

class Persona {
  nombre: string;
  edad: number;

  constructor(nombre: string, edad: number) {
    this.nombre = nombre;
    this.edad = edad;
  }
}

app.get("/", (req: Request, res: Response) => {
  // Respondemos con un objeto JSON simple
  res.json({ message: "Servidor funcionando 🚀" });
});

//todos los EndPoint van a ir desde

// Mi primer Endpoint
app.get("/saludo", (req: Request, res: Response) => {
  res.json({ saludo: "Hola desde Node.js + Express + TypeScript" });
});

//iniciar el servdor HTTP
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// http://localhost:3000/ >> Hola Mundo! este es un servidor express con TypeSript.

app.get("/ping", (req: Request, res: Response) => {
  // Respondemos con un objeto JSON simple
  res.json({ pong: true });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

const p = new Persona("Ana", 34);
app.get("/usuario", (req: Request, res: Response) => {
  // Respondemos con un objeto JSON simple
  res.json({ p });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
