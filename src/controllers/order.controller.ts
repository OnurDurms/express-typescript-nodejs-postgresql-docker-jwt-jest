import { Get, Route, Tags, Post as PostMethod, Body, Path } from "tsoa";
import {Order} from '../models'
import { createOrder, getOrders, IOrderPayload, getOrder, getUserOrders } from "../repositories/order.repository";

@Route("orders")
@Tags("Order")
export default class OrderController {
  @Get("/")
  public async getOrders(): Promise<Array<Order>> {
    return getOrders()
  }

  @PostMethod("/")
  public async createOrder(@Body() body: IOrderPayload): Promise<Order | null> {
    return createOrder(body)
  }

  @Get("/:id")
  public async getOrder(@Path() id: string): Promise<Order | null> {
    return getOrder(Number(id))
  }

  @Get("/user/:userId")
  public async getUserOrders(@Path() userId: string): Promise<Order | null> {
    return getUserOrders(Number(userId))
  }
}