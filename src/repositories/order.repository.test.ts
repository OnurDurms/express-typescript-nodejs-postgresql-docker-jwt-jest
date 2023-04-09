import * as OrderRepository from './order.repository'
import {getRepository} from 'typeorm'
import { mocked } from 'ts-jest/utils'
import {generateOrdersData, generateOrderPayload, generateOrderData} from '../../test/utils/generate'

jest.mock('typeorm');

const mockedGetRepo = mocked(getRepository(<jest.Mock>{}))
beforeEach(() => {
  mockedGetRepo.find.mockClear()
  mockedGetRepo.findOne.mockClear()
  mockedGetRepo.save.mockClear()
})

describe("OrderRepository", () => {
  describe("getOrders", () => {
    test("should return empty array", async () => {
      mockedGetRepo.find.mockResolvedValue([])
      const order = await OrderRepository.getOrders();
      expect(order).toEqual([])
      expect(mockedGetRepo.find).toHaveBeenCalledWith()
      expect(mockedGetRepo.find).toHaveBeenCalledTimes(1)
    })

    test("should return orders list", async () => {
      const ordersData = generateOrdersData(2)
      mockedGetRepo.find.mockResolvedValue(ordersData)
      const orders = await OrderRepository.getOrders();
      expect(orders).toEqual(ordersData)
      expect(mockedGetRepo.find).toHaveBeenCalledWith()
      expect(mockedGetRepo.find).toHaveBeenCalledTimes(1)
    })
  })

  describe("createOrder", () => {
    test("should add order to the database", async () => {
      const payload = generateOrderPayload()
      const orderData = generateOrderData(payload)
      mockedGetRepo.save.mockResolvedValue(orderData)
      const order = await OrderRepository.createOrder(payload);
      expect(order).toEqual(orderData)
      expect(mockedGetRepo.save).toHaveBeenCalledWith(payload)
      expect(mockedGetRepo.save).toHaveBeenCalledTimes(1)
    })
  })

  describe("getOrder", () => {
    test("should return order from the database", async () => {
      const id = 1
      const orderData = generateOrderData({id})
      mockedGetRepo.findOne.mockResolvedValue(orderData)
      const order = await OrderRepository.getOrder(id);
      expect(order).toEqual(orderData)
      expect(order?.id).toBe(id)
      expect(mockedGetRepo.findOne).toHaveBeenCalledWith({id})
      expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1)
    })

    test("should return null if order not found", async () => {
      const id = 1
      mockedGetRepo.findOne.mockResolvedValue(null)
      const order = await OrderRepository.getOrder(id);
      expect(order).toBeNull()
      expect(mockedGetRepo.findOne).toHaveBeenCalledWith({id})
      expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1)
    })
  })
})