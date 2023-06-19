import {
  Prisma,
  Pet,
  Age,
  Space,
  Energy,
  Independence,
  Size,
} from '@prisma/client'

export interface FilterPetsData {
  page: number
  city: string
  size?: Size
  independence?: Independence
  energy?: Energy
  space?: Space
  age?: Age
}
export interface PetsRepository {
  fetchPetsByCity(city: string, page: number): Promise<Pet[]>
  getPetById(pet_id: string): Promise<Pet | null>
  filterPets({
    age,
    energy,
    independence,
    size,
    space,
    city,
    page,
  }: FilterPetsData): Promise<Pet[]>
  create(
    data: Prisma.PetUncheckedCreateInput,
    requirements: string[],
  ): Promise<Pet>
}
