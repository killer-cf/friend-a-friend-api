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
  size?: Size | null
  independence?: Independence | null
  energy?: Energy | null
  space?: Space | null
  age?: Age | null
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
