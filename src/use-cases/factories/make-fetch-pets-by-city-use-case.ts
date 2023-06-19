import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsByCityUseCase } from '../fetch-pets-by-city'

export function makeFetchPetsByCityUseCase() {
  const repository = new PrismaPetsRepository()
  const useCase = new FetchPetsByCityUseCase(repository)

  return useCase
}
