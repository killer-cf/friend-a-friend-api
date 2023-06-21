import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { list } from './list'
import { filter } from './filter'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets', list)

  app.get('/pets/filters', filter)

  app.post('/:userId/pets', { onRequest: [verifyJWT] }, create)
}
