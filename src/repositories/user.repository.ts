import {getRepository} from "typeorm";
import {User} from '../models';
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

export interface IUserPayload {
  isAdmin: number;
  isActive: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const loginUser = async (payload: IUserPayload) :Promise<User | string> => {
  try {

    if (!(payload.email && payload.password)) {
      return "Email or password wrong.";
    }
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({email: payload.email})
    if (user && (await bcrypt.compare(payload.password, user.password))) {
      var token = jwt.sign(
        { user_id: user.id, email:payload.email, isAdmin: user.isAdmin },
        "123456",
        {
          expiresIn: "2h",
        }
      );

      return {...user,...{token: token}};
    } else {
      return "";
    }
  } catch (err) {
    return JSON.stringify(err);
  }
}

export const registerUser = async (payload: IUserPayload) :Promise<User | string> => {
  try {

    if (!(payload.email && payload.password && payload.firstName)) {
      return "All input is required";
    }
    const userRepository = getRepository(User);
    const oldUser = await userRepository.findOne({email: payload.email})

    if (oldUser) {
      return "User Already Exist. Please Login";
    }

    const encryptedPassword = await bcrypt.hash(payload.password, 10);

    const user = await userRepository.save({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email.toLowerCase(),
      password: encryptedPassword,
      isAdmin: payload.isAdmin,
      isActive: payload.isActive,
    });

    const token = jwt.sign(
      { user_id: user.id, email: payload.email },
      "123456",
      {
        expiresIn: "2h",
      }
    );
    (user as any).token = token;
    return user;
  } catch (err) {
    return JSON.stringify(err);
  }
}

export const setAdmin = async (id: number) :Promise<User | null> => {
  const userRepository = getRepository(User);
  await userRepository.update({ id }, { isAdmin: 1 });
  const user = await userRepository.findOne({id: id})
  if (!user) return null
  return user
}

export const getUsers  = async () :Promise<Array<User>> => {
  const userRepository = getRepository(User);
  return userRepository.find()
}

export const createUser  = async (payload: IUserPayload) :Promise<User> => {
  const userRepository = getRepository(User);
  const user = new User()
  return userRepository.save({
    ...user,
    ...payload
  })
}

export const getUser  = async (id: number) :Promise<User | null> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({id: id})
  if (!user) return null
  return user
}