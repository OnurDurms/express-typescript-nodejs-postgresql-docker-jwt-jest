import faker from 'faker'

export function generateUserData(overide = {}) {
  return {
    id: faker.random.number(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.lorem.sentence(),
    isAdmin: 1,
    isActive: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateUsersData(n: number = 1) {
  return Array.from({
    length: n
  }, (_, i) => {
    return generateUserData()
  });
}

export function generateUserPayload() {
  return {
    id: faker.random.number(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.lorem.sentence(),
    isAdmin: 1,
    isActive: 1,
  }
}

export function generateProductData(overide = {}) {
  return {
    id: faker.random.number(),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
    userId: faker.random.number(),
    price: faker.random.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateProductsData(n: number = 1, overide = {}) {
  return Array.from({
    length: n
  }, (_, i) => {
    return generateProductData(overide)
  });
}

export function generateProductPayload() {
  return {
    id: faker.random.number(),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
    userId: faker.random.number(),
    price: faker.random.number(),
    user: { isAdmin: 1 }
  }
}

export function generateCustomerData(overide = {}) {
  return {
    id: faker.random.number(),
    content: faker.lorem.paragraph(),
    userId: faker.random.number(),
    productId: faker.random.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateCustomersData(n: number = 1, overide = {}) {
  return Array.from({
    length: n
  }, (_, i) => {
    return generateCustomerData(overide)
  });
}


export function generateCustomerPayload() {
  return {
    content: faker.lorem.paragraph(),
    userId: faker.random.number(),
    productId: faker.random.number(),
    user: { isAdmin: 1}
  }
}

export function generateOrderData(overide = {}) {
  return {
    id: faker.random.number(),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
    userId: faker.random.number(),
    price: faker.random.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateOrdersData(n: number = 1, overide = {}) {
  return Array.from({
    length: n
  }, (_, i) => {
    return generateProductData(overide)
  });
}

export function generateOrderPayload() {
  return {
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
    userId: faker.random.number(),
    user: {}
  }
}