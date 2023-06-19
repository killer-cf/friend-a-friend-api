import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists'
import { MakeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().min(3),
    phone: z.string(),
    email: z.string().email(),
    address: z.string(),
    cep: z.string(),
    password: z.string().min(6),
  })

  const { name, phone, email, address, cep, password } =
    registerBodySchema.parse(req.body)

  try {
    const registerUseCase = MakeRegisterUseCase()

    await registerUseCase.execute({
      name,
      phone,
      email,
      address,
      cep,
      password,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return res.status(409).send({ message: error.message })
    }

    throw error
  }
}
