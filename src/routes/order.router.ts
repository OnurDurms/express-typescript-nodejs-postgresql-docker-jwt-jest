import express from "express";
import OrderController from '../controllers/order.controller';
import auth from "../middleware/auth";
import {OrderCreateValidation } from "../validations/order/index";

const router = express.Router();

router.get("/", auth, async (_req, res) => {
  const controller = new OrderController();
  const response = await controller.getOrders();
  return res.send(response);
});

router.post("/", OrderCreateValidation, auth, async (req:any, res:any) => {
  const controller = new OrderController();
  const response = await controller.createOrder(req.body);
  return res.send(response);
});

router.get("/:id", auth, async (req: any, res: any) => {
  const controller = new OrderController();
  const response = await controller.getOrder(req.params.id);
  if (!response) res.status(404).send({message: "No order found"})
  return res.send(response);
});

router.get("/user/:userId", auth, async (req: any, res: any) => {
  const controller = new OrderController();
  const response = await controller.getUserOrders(req.params.userId);
  if (!response) res.status(404).send({message: "No order found"})
  return res.send(response);
});
export default router;