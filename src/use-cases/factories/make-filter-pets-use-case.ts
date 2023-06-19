import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FilterPetsUseCase } from '../filter-pets'

export function MakeFilterPetsUseCase() {
  const repository = new PrismaPetsRepository()
  const useCase = new FilterPetsUseCase(repository)

  return useCase
}
