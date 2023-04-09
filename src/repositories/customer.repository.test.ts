import * as CustomerRepository from './customer.repository'
import {getRepository} from 'typeorm'
import { mocked } from 'ts-jest/utils'
import {generateCustomersData, generateCustomerPayload, generateCustomerData} from '../../test/utils/generate'

jest.mock('typeorm');

const mockedGetRepo = mocked(getRepository(<jest.Mock>{}))
beforeEach(() => {
  mockedGetRepo.find.mockClear()
  mockedGetRepo.findOne.mockClear()
  mockedGetRepo.save.mockClear()
})

describe("CustomerRepository", () => {
  describe("getCustomers", () => {
    test("should return empty array", async () => {
      mockedGetRepo.find.mockResolvedValue([])
      const customers = await CustomerRepository.getCustomers();
      expect(customers).toEqual([])
      expect(mockedGetRepo.find).toHaveBeenCalledWith()
      expect(mockedGetRepo.find).toHaveBeenCalledTimes(1)
    })

    test("should return customers list", async () => {
      const customersData = generateCustomersData(2)
      mockedGetRepo.find.mockResolvedValue(customersData)
      const customers = await CustomerRepository.getCustomers();
      expect(customers).toEqual(customersData)
      expect(mockedGetRepo.find).toHaveBeenCalledWith()
      expect(mockedGetRepo.find).toHaveBeenCalledTimes(1)
    })
  })

  describe("createCustomer", () => {
    test("should add customer to the database", async () => {
      const payload = generateCustomerPayload()
      const customerData = generateCustomerData(payload)
      mockedGetRepo.save.mockResolvedValue(customerData)
      const customer = await CustomerRepository.createCustomer(payload);
      expect(customer).toEqual(customerData)
      expect(mockedGetRepo.save).toHaveBeenCalledWith(payload)
      expect(mockedGetRepo.save).toHaveBeenCalledTimes(1)
    })
  })

  describe("getCustomer", () => {
    test("should return customer from the database", async () => {
      const id = 1
      const customerData = generateCustomerData({id})
      mockedGetRepo.findOne.mockResolvedValue(customerData)
      const customer = await CustomerRepository.getCustomer(id);
      expect(customer).toEqual(customerData)
      expect(customer?.id).toBe(id)
      expect(mockedGetRepo.findOne).toHaveBeenCalledWith({id})
      expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1)
    })

    test("should return null if customer not found", async () => {
      const id = 1
      mockedGetRepo.findOne.mockResolvedValue(null)
      const customer = await CustomerRepository.getCustomer(id);
      expect(customer).toBeNull()
      expect(mockedGetRepo.findOne).toHaveBeenCalledWith({id})
      expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1)
    })
  })
})