import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetUseCase } from '../get-pet'

export function MakeGetPetUseCase() {
  const repository = new PrismaPetsRepository()
  const useCase = new GetPetUseCase(repository)

  return useCase
}
