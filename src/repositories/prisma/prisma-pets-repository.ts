import { Prisma } from '@prisma/client'
import { FilterPetsData, PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async filterPets({
    age,
    energy,
    independence,
    size,
    space,
    city,
    page,
  }: FilterPetsData) {
    const filters: Prisma.PetWhereInput[] = []

    if (age) {
      filters.push({ age: { equals: age } })
    }

    if (energy) {
      filters.push({ energy: { equals: energy } })
    }

    if (independence) {
      filters.push({ independence: { equals: independence } })
    }

    if (size) {
      filters.push({ size: { equals: size } })
    }

    if (space) {
      filters.push({ space: { equals: space } })
    }

    const pets = await prisma.pet.findMany({
      take: 20,
      where: {
        city,
        AND: filters,
      },
      skip: (page - 1) * 20,
    })

    return pets
  }

  async getPetById(pet_id: string) {
    const pet = await prisma.pet.findUnique({
      where: { id: pet_id },
    })

    return pet
  }

  async fetchPetsByCity(city: string, page: number) {
    const pets = await prisma.pet.findMany({
      take: 20,
      where: {
        city,
      },
      skip: (page - 1) * 20,
    })

    return pets
  }

  async create(
    data: Prisma.PetUncheckedCreateInput,
    requirementsData: string[],
  ) {
    const requirements = requirementsData.map((r) => {
      return {
        title: r,
      }
    })

    const pet = await prisma.pet.create({
      data: {
        ...data,
        requirements: {
          createMany: {
            data: requirements,
          },
        },
      },
    })

    return pet
  }
}
