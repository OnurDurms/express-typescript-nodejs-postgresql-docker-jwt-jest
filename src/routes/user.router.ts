import express from "express";
import UserController from "../controllers/user.controller";
import auth from "../middleware/auth";
import { validationResult } from "express-validator";
import {LoginValidation, RegisterValidation, UserCreateValidation} from "../validations/user/index";

const router = express.Router();

router.post("/login",LoginValidation, async (req: any, res: any) => {
    const error = validationResult(req).formatWith(({ msg }) => msg);
    const hasError = !error.isEmpty();
    if (hasError) {
        res.status(422).json({ error: error.array() });
    } else {
        const controller = new UserController();
        const response = await controller.loginUser(req.body);
        return res.send(response);
    }
});

router.post("/register", RegisterValidation, async (req: any,res:any) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);

  const hasError = !error.isEmpty();

  if (hasError) {
      res.status(422).json({ error: error.array() });
  } else {
      const controller = new UserController();
      const response = await controller.registerUser(req.body);
      return res.send(response);
  }
});

router.post("/:id", auth, async (req, res) => {
  const controller = new UserController();
  const response = await controller.setAdmin(req.params.id);
  return res.send(response);
});

router.get("/", auth, async (_req, res) => {
  const controller = new UserController();
  const response = await controller.getUsers();
  return res.send(response);
});

router.post("/", UserCreateValidation, auth, async (req:any, res: any) => {
  const controller = new UserController();
  const response = await controller.createUser(req.body);
  return res.send(response);
});

router.get("/:id", auth, async (req, res) => {
  const controller = new UserController();
  const response = await controller.getUser(req.params.id);
  if (!response) res.status(404).send({message: "No user found"})
  return res.send(response);
});

export default router