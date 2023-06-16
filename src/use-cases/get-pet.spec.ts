import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetUseCase } from './get-pet'
import { ResourceNotFoundError } from './errors/resource-not-found'

let petsRepository: InMemoryPetsRepository
let sut: GetPetUseCase

describe('Fetch pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to to get a pet', async () => {
    const petCreated = await petsRepository.create(
      {
        name: 'Jose',
        about: 'Cachorinho muito legal e dócil',
        space: 'BIG',
        age: 'JUVENILE',
        city: 'Recife',
        energy: 'HIGH',
        independence: 'LOW',
        size: 'MEDIUM',
        user_id: 'user_01',
      },
      [],
    )

    const { pet } = await sut.execute({
      pet_id: petCreated.id,
    })

    expect(pet).toEqual(expect.objectContaining({ name: 'Jose' }))
  })

  it('should not be able to get pet with wrong pet_id', async () => {
    await expect(() =>
      sut.execute({
        pet_id: 'a_wrong_pet_id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
