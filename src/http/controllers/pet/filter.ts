import { makeFilterPetsUseCase } from '@/use-cases/factories/make-filter-pets-use-case'
import { Age, Energy, Independence, Size, Space } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function filter(req: FastifyRequest, res: FastifyReply) {
  const filterPetsQuerySchema = z.object({
    age: z.enum([Age.PUPPY, Age.JUVENILE, Age.ADULT, Age.OLD]).optional(),
    energy: z.enum([Energy.LOW, Energy.MEDIUM, Energy.HIGH]).optional(),
    independence: z
      .enum([Independence.LOW, Independence.MEDIUM, Independence.HIGH])
      .optional(),
    size: z.enum([Size.SMALL, Size.MEDIUM, Size.BIG]).optional(),
    space: z.enum([Space.SMALL, Space.MEDIUM, Space.BIG]).optional(),
    city: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { city, page, age, space, size, independence, energy } =
    filterPetsQuerySchema.parse(req.query)

  const filterPetsUseCase = makeFilterPetsUseCase()

  const { pets } = await filterPetsUseCase.execute({
    age,
    energy,
    independence,
    size,
    space,
    city,
    page,
  })

  return res.status(200).send({ pets })
}
