import express, { Request, Response } from "express";
import path from "path";

import "dotenv/config";

import usersRouter from "./routes/users.routes";

import productsRouter from "./routes/products.routes";

const app = express();
const PORT = process.env.PORT3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api/users", usersRouter);

app.use("/products", productsRouter);

app.listen(PORT, () => {
  console.log("Servidor corriendo en http:/localhost:$PORT}");
});
