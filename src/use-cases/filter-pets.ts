import { Pet } from '@prisma/client'
import { FilterPetsData, PetsRepository } from '@/repositories/pets-repository'

interface FilterPetUseCaseRequest extends FilterPetsData {}

interface FilterPetUseCaseResponse {
  pets: Pet[]
}

export class FilterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    age,
    energy,
    independence,
    size,
    space,
    city,
  }: FilterPetUseCaseRequest): Promise<FilterPetUseCaseResponse> {
    const pets = await this.petsRepository.filterPets({
      age,
      energy,
      independence,
      size,
      space,
      city,
    })

    return { pets }
  }
}
