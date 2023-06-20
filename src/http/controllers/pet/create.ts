import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { Age, Energy, Independence, Size, Space } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createPetParamsSchema = z.object({
    userId: z.string().uuid(),
  })

  const createPetBodySchema = z.object({
    name: z.string().min(2),
    about: z.string().min(3),
    age: z.enum([Age.PUPPY, Age.JUVENILE, Age.ADULT, Age.OLD]),
    energy: z.enum([Energy.LOW, Energy.MEDIUM, Energy.HIGH]),
    independence: z.enum([
      Independence.LOW,
      Independence.MEDIUM,
      Independence.HIGH,
    ]),
    requirements: z.array(z.string()),
    size: z.enum([Size.SMALL, Size.MEDIUM, Size.BIG]),
    space: z.enum([Space.SMALL, Space.MEDIUM, Space.BIG]),
    city: z.string(),
  })

  const {
    name,
    about,
    age,
    energy,
    independence,
    requirements,
    size,
    space,
    city,
  } = createPetBodySchema.parse(req.body)

  const { userId } = createPetParamsSchema.parse(req.params)

  try {
    const createPetUseCase = makeCreatePetUseCase()

    await createPetUseCase.execute({
      name,
      about,
      age,
      energy,
      independence,
      requirements,
      size,
      space,
      city,
      user_id: userId,
    })
  } catch (error) {
    console.log(error)
  }

  return res.status(201).send()
}
