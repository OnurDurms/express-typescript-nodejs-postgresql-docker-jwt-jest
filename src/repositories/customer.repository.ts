import { Request } from "express";
import {getRepository} from "typeorm";
import {Customer} from '../models'

export interface ICustomerPayload {
  user: any;
  content: string;
  userId: number;
}

export const getCustomers  = async () :Promise<Array<Customer>> => {
  const customerRepository = getRepository(Customer);
  return customerRepository.find()
}

export const createCustomer  = async (payload: ICustomerPayload) :Promise<Customer | string> => {
  if(payload.user && payload.user.isAdmin){
    delete payload.user;
    const customerRepository = getRepository(Customer);
    let customer = new Customer()
    customer = await customerRepository.save({
      ...customer,
      ...payload
    });
    if (!customer) return "No customer found"
    return customer
  }else{
    return "User isn't admin";
  }
}

export const getCustomer  = async (id: number) :Promise<Customer | null> => {
  const customerRepository = getRepository(Customer);
  const customer = await customerRepository.findOne({id: id})
  if (!customer) return null
  return customer
}