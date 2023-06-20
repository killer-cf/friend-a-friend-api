import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { list } from './list'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets', list)

  app.post('/:userId/pets', { onRequest: [verifyJWT] }, create)
}
