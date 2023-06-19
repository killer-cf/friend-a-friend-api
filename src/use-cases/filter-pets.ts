import { Pet } from '@prisma/client'
import { FilterPetsData, PetsRepository } from '@/repositories/pets-repository'

interface FilterPetsUseCaseRequest extends FilterPetsData {}

interface FilterPetsUseCaseResponse {
  pets: Pet[]
}

export class FilterPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    age,
    energy,
    independence,
    size,
    space,
    city,
    page,
  }: FilterPetsUseCaseRequest): Promise<FilterPetsUseCaseResponse> {
    const pets = await this.petsRepository.filterPets({
      age,
      energy,
      independence,
      size,
      space,
      city,
      page,
    })

    return { pets }
  }
}
