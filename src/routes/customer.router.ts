import express from "express";
import CustomerController from '../controllers/customer.controller';
import auth from "../middleware/auth";
import {CustomerCreateValidation } from "../validations/customer/index";

const router = express.Router();

router.get("/", auth, async (_req, res) => {
  const controller = new CustomerController();
  const response = await controller.getCustomers();
  return res.send(response);
});

router.post("/", CustomerCreateValidation, auth, async (req: any, res: any) => {
  const controller = new CustomerController();
  const response = await controller.createCustomer(req.body);
  return res.send(response);
});

router.get("/:id", auth, async (req: any, res: any) => {
  const controller = new CustomerController();
  const response = await controller.getCustomer(req.params.id);
  if (!response) res.status(404).send({message: "No costumer found"})
  return res.send(response);
});

export default router;