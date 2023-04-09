import * as ProductRepository from './product.repository'
import {getRepository} from 'typeorm'
import { mocked } from 'ts-jest/utils'
import {generateProductsData, generateProductPayload, generateProductData} from '../../test/utils/generate'

jest.mock('typeorm');

const mockedGetRepo = mocked(getRepository(<jest.Mock>{}))
beforeEach(() => {
  mockedGetRepo.find.mockClear()
  mockedGetRepo.findOne.mockClear()
  mockedGetRepo.save.mockClear()
})

describe("ProductRepository", () => {
  describe("getProducts", () => {
    test("should return empty array", async () => {
      mockedGetRepo.find.mockResolvedValue([])
      const products = await ProductRepository.getProducts();
      expect(products).toEqual([])
      expect(mockedGetRepo.find).toHaveBeenCalledWith()
      expect(mockedGetRepo.find).toHaveBeenCalledTimes(1)
    })

    test("should return products list", async () => {
      const productsData = generateProductsData(2)
      mockedGetRepo.find.mockResolvedValue(productsData)
      const products = await ProductRepository.getProducts();
      expect(products).toEqual(productsData)
      expect(mockedGetRepo.find).toHaveBeenCalledWith()
      expect(mockedGetRepo.find).toHaveBeenCalledTimes(1)
    })
  })

  describe("createProduct", () => {
    test("should add product to the database", async () => {
      const payload = generateProductPayload()
      const productData = generateProductData(payload)
      mockedGetRepo.save.mockResolvedValue(productData)
      const product = await ProductRepository.createProduct(payload);
      expect(product).toEqual(productData)
      expect(mockedGetRepo.save).toHaveBeenCalledWith(payload)
      expect(mockedGetRepo.save).toHaveBeenCalledTimes(1)
    })
  })

  describe("getProduct", () => {
    test("should return product from the database", async () => {
      const id = 1
      const productData = generateProductData({id})
      mockedGetRepo.findOne.mockResolvedValue(productData)
      const product = await ProductRepository.getProduct(id);
      expect(product).toEqual(productData)
      expect(product?.id).toBe(id)
      expect(mockedGetRepo.findOne).toHaveBeenCalledWith({id})
      expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1)
    })

    test("should return null if product not found", async () => {
      const id = 1
      mockedGetRepo.findOne.mockResolvedValue(null)
      const product = await ProductRepository.getProduct(id);
      expect(product).toBeNull()
      expect(mockedGetRepo.findOne).toHaveBeenCalledWith({id})
      expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1)
    })
  })
})