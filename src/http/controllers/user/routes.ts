import { FastifyInstance } from 'fastify'
import { register } from './register'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', { onRequest: [verifyJWT] }, register)
}
