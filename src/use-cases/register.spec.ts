import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register an user', async () => {
    const { user } = await sut.execute({
      name: 'Jose',
      email: 'jose@gmail.com',
      phone: '81999999865',
      address: '123 Main Street',
      cep: '50720-570',
      password: 'password',
    })

    expect(user.name).toEqual('Jose')
    expect(user.email).toEqual('jose@gmail.com')
    expect(user.phone).toEqual('81999999865')
    expect(user.address).toEqual('123 Main Street')
    expect(user.cep).toEqual('50720-570')
    expect(user.password_hash).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Jose',
      email: 'jose@gmail.com',
      phone: '81999999865',
      address: '123 Main Street',
      cep: '50720-570',
      password: 'password',
    })

    const isPasswordCorrectlyHashed = await compare(
      'password',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    await sut.execute({
      name: 'Jose',
      email: 'jose@gmail.com',
      phone: '81999999865',
      address: '123 Main Street',
      cep: '50720-570',
      password: 'password',
    })

    await expect(() =>
      sut.execute({
        name: 'Jose',
        email: 'jose@gmail.com',
        phone: '81999999865',
        address: '123 Main Street',
        cep: '50720-570',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
