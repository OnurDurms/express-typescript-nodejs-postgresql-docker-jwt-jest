import ProductController from './product.controller'
import * as ProductRepository from '../repositories/product.repository'
import {generateProductsData, generateProductPayload, generateProductData} from '../../test/utils/generate'

afterEach(() => {
  jest.resetAllMocks()
})

describe("ProductController", () => {
  describe("getProducts", () => {
    test("should return empty array", async () => {
      const spy = jest.spyOn(ProductRepository, 'getProducts').mockResolvedValueOnce([])
      const controller = new ProductController();
      const products = await controller.getProducts();
      expect(products).toEqual([])
      expect(spy).toHaveBeenCalledWith()
      expect(spy).toHaveBeenCalledTimes(1)
    })

    test("should return products list", async () => {
      const productsData = generateProductsData(2);
      const spy = jest.spyOn(ProductRepository, 'getProducts').mockResolvedValueOnce(productsData)
      const controller = new ProductController();
      const products = await controller.getProducts();
      expect(products).toEqual(productsData)
      expect(spy).toHaveBeenCalledWith()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe("createProduct", () => {
    test("should add product to the database", async () => {
      
      const payload = generateProductPayload()
      const productData = generateProductData(payload)
      const spy = jest.spyOn(ProductRepository, 'createProduct').mockResolvedValueOnce(productData)
      const controller = new ProductController();
      const product = await controller.createProduct(payload);
      expect(product).toMatchObject(payload)
      expect(product).toEqual(productData)
      expect(spy).toHaveBeenCalledWith(payload)
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe("getProduct", () => {
    test("should return product from the database", async () => {
      const id = 1
      const productData = generateProductData({id})
      const spy = jest.spyOn(ProductRepository, 'getProduct').mockResolvedValueOnce(productData)
      const controller = new ProductController();
      const product = await controller.getProduct(id.toString());
      expect(product).toEqual(productData)
      expect(product?.id).toBe(id)
      expect(spy).toHaveBeenCalledWith(id)
      expect(spy).toHaveBeenCalledTimes(1)
    })

    test("should return null if product not found", async () => {
      const id = 1
      const spy = jest.spyOn(ProductRepository, 'getProduct').mockResolvedValueOnce(null)
      const controller = new ProductController();
      const product = await controller.getProduct(id.toString());
      expect(product).toBeNull()
      expect(spy).toHaveBeenCalledWith(id)
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
})