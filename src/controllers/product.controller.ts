import { Get, Route, Tags, Post as PostMethod,Put, Body, Path } from "tsoa";
import {Product} from '../models'
import { createProduct, getProducts, IProductPayload, getProduct, setProduct } from "../repositories/product.repository";

@Route("products")
@Tags("Product")
export default class ProductController {
  @Get("/")
  public async getProducts(): Promise<Array<Product>> {
    return getProducts()
  }

  @PostMethod("/")
  public async createProduct(@Body() body: IProductPayload): Promise<Product | null> {
    return createProduct(body)
  }

  @Get("/:id")
  public async getProduct(@Path() id: string): Promise<Product | null> {
    return getProduct(Number(id))
  }

  @Put("/:id")
  public async setProduct(@Path() id: number,@Body() body: IProductPayload): Promise<Product | null> {
    return setProduct(id,body)
  }
}