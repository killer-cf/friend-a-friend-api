import { Age, Energy, Independence, Pet, Size, Space } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface CreatePetUseCaseRequest {
  name: string
  about: string
  city: string
  size: Size
  independence: Independence
  energy: Energy
  space: Space
  age: Age
  user_id: string
  requirements: string[]
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    about,
    age,
    energy,
    independence,
    requirements,
    size,
    space,
    city,
    user_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create(
      {
        name,
        about,
        age,
        energy,
        independence,
        size,
        space,
        user_id,
        city,
      },
      requirements,
    )

    return { pet }
  }
}
