import CustomerController from './customer.controller'
import * as CustomerRepository from '../repositories/customer.repository'
import {generateCustomersData, generateCustomerPayload, generateCustomerData} from '../../test/utils/generate'

afterEach(() => {
  jest.resetAllMocks()
})

describe("CustomerController", () => {
  describe("getCustomers", () => {
    test("should return empty array", async () => {
      const spy = jest.spyOn(CustomerRepository, 'getCustomers').mockResolvedValueOnce([])
      const controller = new CustomerController();
      const comments = await controller.getCustomers();
      expect(comments).toEqual([])
      expect(spy).toHaveBeenCalledWith()
      expect(spy).toHaveBeenCalledTimes(1)
    })

    test("should return customers list", async () => {
      const customersData = generateCustomersData(2)
      const spy = jest.spyOn(CustomerRepository, 'getCustomers').mockResolvedValueOnce(customersData)
      const controller = new CustomerController();
      const comments = await controller.getCustomers();
      expect(comments).toEqual(customersData)
      expect(spy).toHaveBeenCalledWith()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe("createCustomer", () => {
    test("should add comment to the database", async () => {
      const payload = generateCustomerPayload()
      const customerData = generateCustomerData(payload)
      const spy = jest.spyOn(CustomerRepository, 'createCustomer').mockResolvedValueOnce(customerData)
      const controller = new CustomerController();
      const customer = await controller.createCustomer(payload);
      expect(customer).toEqual(customerData)
      expect(spy).toHaveBeenCalledWith(payload)
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe("getCustomer", () => {
    test("should return customer from the database", async () => {
      const id = 1
      const customerData = generateCustomerData({id})
      const spy = jest.spyOn(CustomerRepository, 'getCustomer').mockResolvedValueOnce(customerData)
      const controller = new CustomerController();
      const customer = await controller.getCustomer(id.toString());
      expect(customer).toEqual(customerData)
      expect(spy).toHaveBeenCalledWith(id)
      expect(spy).toHaveBeenCalledTimes(1)
    })

    test("should return null if customer not found", async () => {
      const id = 1
      const spy = jest.spyOn(CustomerRepository, 'getCustomer').mockResolvedValueOnce(null)
      const controller = new CustomerController();
      const customer = await controller.getCustomer(id.toString());
      expect(customer).toBeNull()
      expect(spy).toHaveBeenCalledWith(id)
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
})