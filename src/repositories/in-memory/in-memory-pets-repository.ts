import { Pet, Prisma, Requirement } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { FilterPetsData, PetsRepository } from '../pets-repository'

interface PetsWithRequirement extends Pet {
  requirements: Requirement[]
}

export class InMemoryPetsRepository implements PetsRepository {
  public items: PetsWithRequirement[] = []

  async filterPets({
    age,
    energy,
    independence,
    size,
    space,
    city,
  }: FilterPetsData) {
    const pets = this.items
      .filter((pet) => pet.city === city)
      .filter((pet) => {
        const isAge = age ? pet.age.includes(age) : true
        const isEnergy = energy ? pet.energy.includes(energy) : true
        const isSpace = space ? pet.space.includes(space) : true
        const isIndependence = independence
          ? pet.independence.includes(independence)
          : true
        const isSize = size ? pet.size.includes(size) : true

        const attributes = [isAge, isEnergy, isSpace, isIndependence, isSize]

        return attributes.every((attribute) => attribute === true)
      })

    return pets
  }

  async getPetById(pet_id: string) {
    const pet = await this.items.find((item) => item.id === pet_id)

    if (!pet) {
      return null
    }

    return pet
  }

  async fetchPetsByCity(city: string, page: number) {
    const pets = await this.items
      .filter((item) => item.city === city)
      .slice((page - 1) * 20, page * 20)

    return pets
  }

  async create(
    data: Prisma.PetUncheckedCreateInput,
    requirementsData: string[],
  ) {
    const petId = randomUUID()

    const requirements: Requirement[] = requirementsData?.map((req) => {
      return { id: randomUUID(), title: req, pet_id: petId }
    })

    const pet = {
      ...data,
      id: petId,
      created_at: new Date(),
      updated_at: new Date(),
      requirements,
    }

    this.items.push(pet)

    return pet
  }
}
