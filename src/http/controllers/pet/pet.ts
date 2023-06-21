import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function pet(req: FastifyRequest, res: FastifyReply) {
  const filterPetsParamsSchema = z.object({
    petId: z.string(),
  })

  const { petId } = filterPetsParamsSchema.parse(req.params)

  try {
    const getPetUseCase = makeGetPetUseCase()

    const { pet } = await getPetUseCase.execute({
      pet_id: petId,
    })

    return res.status(200).send({ pet })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      res.status(404).send({ message: error.message })
    }

    throw error
  }
}
