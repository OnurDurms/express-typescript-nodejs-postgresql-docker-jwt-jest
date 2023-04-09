import {getRepository} from "typeorm";
import {Order} from '../models'

export interface IOrderPayload {
  user: any;
  title: string;
  content: string;
  userId: number;
}

export const getOrders  = async () :Promise<Array<Order>> => {
  const orderRepository = getRepository(Order);
  return orderRepository.find()
}

export const createOrder  = async (payload: IOrderPayload) :Promise<Order | null> => {
  delete payload.user;
  const orderRepository = getRepository(Order);
  let order = new Order()
  order = await orderRepository.save({
    ...order,
    ...payload
  })
  if (!order) return null
  return order
}

export const getOrder  = async (id: number) :Promise<Order | null> => {
  const orderRepository = getRepository(Order);
  const order = await orderRepository.findOne({id: id})
  if (!order) return null
  return order
}

export const getUserOrders  = async (id: number) :Promise<Order | null> => {
  const orderRepository = getRepository(Order);
  const orders = await orderRepository.findOne({userId: id})
  if (!orders) return null
  return orders
}