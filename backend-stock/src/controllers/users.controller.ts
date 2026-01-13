import { Request, Response } from "express";
import * as userService from "../services/users.service";
import { sendWelcomeEmail } from "../services/mail.service";

export const getAllUsers = (req: Request, res: Response) => {
  const data = userService.getUsers();
  res.json(data);
};

export const addUser = async (req: Request, res: Response) => {
  const user = userService.createUser(req.body);

  // Enviamos el email de bienvenida
  await sendWelcomeEmail(user.email, user.name);

  res.status(201).json(user);
};
