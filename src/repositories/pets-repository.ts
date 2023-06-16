import { Prisma, Pet } from '@prisma/client'

export interface PetsRepository {
  fetchPetsByCity(city: string, page: number): Promise<Pet[]>
  getPetById(pet_id: string): Promise<Pet | null>
  create(
    data: Prisma.PetUncheckedCreateInput,
    requirements: string[],
  ): Promise<Pet>
}
