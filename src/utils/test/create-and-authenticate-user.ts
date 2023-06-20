import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  const user = await prisma.user.create({
    data: {
      name: 'Jose',
      email: 'jose@gmail.com',
      phone: '81999999865',
      address: '123 Main Street',
      cep: '50720-570',
      password_hash: await hash('password', 6),
      role: isAdmin ? 'ADMIN' : 'ORG',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'jose@gmail.com',
    password: 'password',
  })

  const { token } = authResponse.body

  return { token, user }
}
