import express, { Request, Response } from "express";
import path from 'path';

import 'dotenv/config';

const app = express();
const PORT = process.env.PORT3000;  

app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/saludo', (req: Request, res= Response))=>{
  res.json ({mensaje: 'Hola desde la Api'});
}

app.listen(PORT, ()=> {
  console.log('Servidor corriendo en http:/localhost:$PORT}');
});


