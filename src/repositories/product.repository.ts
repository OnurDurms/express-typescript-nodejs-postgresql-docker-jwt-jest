import {getRepository} from "typeorm";
import {Product} from '../models'

export interface IProductPayload {
  user: any;
  id: number;
  title: string;
  content: string;
  price: number;
  userId: number;
}

export const getProducts  = async () :Promise<Array<Product>> => {
  const productRepository = getRepository(Product);
  return productRepository.find()
}

export const createProduct  = async (payload: IProductPayload) :Promise<Product | null> => {
  delete payload.user;
  const productRepository = getRepository(Product);
  let product = new Product()
  product = await productRepository.save({
    ...product,
    ...payload
  })
  if (!product) return null
  return product
}

export const getProduct  = async (id: number) :Promise<Product | null> => {
  const productRepository = getRepository(Product);
  const product = await productRepository.findOne({id: id})
  if (!product) return null
  return product
}

export const setProduct  = async (id: number,payload: IProductPayload) :Promise<Product | null> => {
  delete payload.user;
  const productRepository = getRepository(Product);
  await productRepository.update({
    id,
  }, {
    ...payload
  });
  const product = await productRepository.findOne({id: id})
  if (!product) return null
  return product
}