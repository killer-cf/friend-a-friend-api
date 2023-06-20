import { makeFetchPetsByCityUseCase } from '@/use-cases/factories/make-fetch-pets-by-city-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function list(req: FastifyRequest, res: FastifyReply) {
  const listPetsQuerySchema = z.object({
    city: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { city, page } = listPetsQuerySchema.parse(req.query)

  const fetchPetsByCityUseCase = makeFetchPetsByCityUseCase()

  const { pets } = await fetchPetsByCityUseCase.execute({
    city,
    page,
  })

  return res.status(200).send({ pets })
}
