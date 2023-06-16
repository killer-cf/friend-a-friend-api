import { Prisma, Pet } from '@prisma/client'

export interface PetsRepository {
  fetchPetsByCity(city: string, page: number): Promise<Pet[]>
  create(
    data: Prisma.PetUncheckedCreateInput,
    requirements: string[],
  ): Promise<Pet>
}
