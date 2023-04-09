import { Get, Route, Tags,  Post, Body, Path } from "tsoa";
import {User} from '../models'
import {getUsers, createUser, IUserPayload, getUser, loginUser, registerUser, setAdmin} from '../repositories/user.repository'

@Route("users")
@Tags("User")
export default class UserController {

  @Post("/login")
  public async loginUser(@Body() body: IUserPayload): Promise<User | string> {
    return loginUser(body)
  }

  @Post("/register")
  public async registerUser(@Body() body: IUserPayload): Promise<User | string> {
    return registerUser(body)
  }

  @Post("/:id")
  public async setAdmin(@Path() id: string): Promise<User | null> {
    return setAdmin(Number(id))
  }

  @Get("/")
  public async getUsers(): Promise<Array<User>> {
    return getUsers()
  }

  @Post("/")
  public async createUser(@Body() body: IUserPayload): Promise<User> {
    return createUser(body)
  }

  @Get("/:id")
  public async getUser(@Path() id: string): Promise<User | null> {
    return getUser(Number(id))
  }
}