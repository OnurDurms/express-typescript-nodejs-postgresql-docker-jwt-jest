import express from "express";
import ProductController from '../controllers/product.controller';
import auth from "../middleware/auth";
import {setProductValidation, ProductCreateValidation} from "../validations/product/index";

const router = express.Router();

router.get("/", auth, async (_req, res) => {
  const controller = new ProductController();
  const response = await controller.getProducts();
  return res.send(response);
});

router.post("/", ProductCreateValidation, auth, async (req: any, res: any) => {
  const controller = new ProductController();
  const response = await controller.createProduct(req.body);
  return res.send(response);
});

router.get("/:id", auth, async (req, res) => {
  const controller = new ProductController();
  const response = await controller.getProduct(req.params.id);
  if (!response) res.status(404).send({message: "No product found"})
  return res.send(response);
});

router.put("/:id", setProductValidation, auth, async (req: any, res: any) => {
  const controller = new ProductController();
  const response = await controller.setProduct(parseInt(req.params.id),req.body);
  if (!response) res.status(404).send({message: "No product found"})
  return res.send(response);
});
export default router;