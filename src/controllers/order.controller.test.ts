import OrderController from './order.controller'
import * as OrderRepository from '../repositories/order.repository'
import {generateOrdersData, generateOrderPayload, generateOrderData} from '../../test/utils/generate'

afterEach(() => {
  jest.resetAllMocks()
})

describe("OrderController", () => {
  describe("getOrders", () => {
    test("should return empty array", async () => {
      const spy = jest.spyOn(OrderRepository, 'getOrders').mockResolvedValueOnce([])
      const controller = new OrderController();
      const orders = await controller.getOrders();
      expect(orders).toEqual([])
      expect(spy).toHaveBeenCalledWith()
      expect(spy).toHaveBeenCalledTimes(1)
    })

    test("should return orders list", async () => {
      const ordersData = generateOrdersData(2);
      const spy = jest.spyOn(OrderRepository, 'getOrders').mockResolvedValueOnce(ordersData)
      const controller = new OrderController();
      const orders = await controller.getOrders();
      expect(orders).toEqual(ordersData)
      expect(spy).toHaveBeenCalledWith()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe("createOrder", () => {
    test("should add order to the database", async () => {
      
      const payload = generateOrderPayload()
      const orderData = generateOrderData(payload)
      const spy = jest.spyOn(OrderRepository, 'createOrder').mockResolvedValueOnce(orderData)
      const controller = new OrderController();
      const order = await controller.createOrder(payload);
      expect(order).toMatchObject(payload)
      expect(order).toEqual(orderData)
      expect(spy).toHaveBeenCalledWith(payload)
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe("getOrder", () => {
    test("should return order from the database", async () => {
      const id = 1
      const orderData = generateOrderData({id})
      const spy = jest.spyOn(OrderRepository, 'getOrder').mockResolvedValueOnce(orderData)
      const controller = new OrderController();
      const order = await controller.getOrder(id.toString());
      expect(order).toEqual(orderData)
      expect(order?.id).toBe(id)
      expect(spy).toHaveBeenCalledWith(id)
      expect(spy).toHaveBeenCalledTimes(1)
    })

    test("should return null if order not found", async () => {
      const id = 1
      const spy = jest.spyOn(OrderRepository, 'getOrder').mockResolvedValueOnce(null)
      const controller = new OrderController();
      const order = await controller.getOrder(id.toString());
      expect(order).toBeNull()
      expect(spy).toHaveBeenCalledWith(id)
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
})