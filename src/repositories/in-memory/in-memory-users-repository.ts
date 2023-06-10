import { Prisma, User } from '@prisma/client'
import { UserRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UserRepository {
  public items: User[] = []

  async findByEmail(email: string) {
    const user = await this.items.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      created_at: new Date(),
      name: data.name,
      phone: data.phone,
      address: data.address,
      cep: data.cep,
      email: data.email,
      password_hash: data.password_hash,
    }

    this.items.push(user)

    return user
  }
}
