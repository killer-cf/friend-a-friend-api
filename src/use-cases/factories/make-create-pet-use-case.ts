import { CreatePetUseCase } from '../create-pet'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeCreatePetUseCase() {
  const repository = new PrismaPetsRepository()
  const useCase = new CreatePetUseCase(repository)

  return useCase
}
