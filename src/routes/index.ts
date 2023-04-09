import express from "express";
import ProductRouter from "./product.router";
import UserRouter from "./user.router";
import CustomerRouter from "./customer.router";
import OrderRouter from "./order.router";

const router = express.Router();

router.use("/users", UserRouter)
router.use("/products", ProductRouter)
router.use("/customers", CustomerRouter)
router.use("/orders", OrderRouter)

export default router;
