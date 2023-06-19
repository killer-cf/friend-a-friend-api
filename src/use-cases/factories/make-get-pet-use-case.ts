import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetUseCase } from '../get-pet'

export function makeGetPetUseCase() {
  const repository = new PrismaPetsRepository()
  const useCase = new GetPetUseCase(repository)

  return useCase
}
