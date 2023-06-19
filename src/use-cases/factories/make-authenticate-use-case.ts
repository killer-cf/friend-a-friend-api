import { AuthenticateUseCase } from '../authenticate'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeAuthenticateUseCase() {
  const repository = new PrismaUsersRepository()
  const useCase = new AuthenticateUseCase(repository)

  return useCase
}
