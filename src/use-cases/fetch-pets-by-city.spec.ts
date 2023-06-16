import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchPetsByCityUseCase } from './fetch-pets-by-city'

let petsRepository: InMemoryPetsRepository
let sut: FetchPetsByCityUseCase

describe('Fetch pets by city Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsByCityUseCase(petsRepository)
  })

  it('should be able to fetch pets by city', async () => {
    await petsRepository.create(
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

    await petsRepository.create(
      {
        name: 'Morango',
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

    await petsRepository.create(
      {
        name: 'Bono',
        about: 'Cachorinho muito legal e dócil',
        space: 'BIG',
        age: 'JUVENILE',
        city: 'São Paulo',
        energy: 'HIGH',
        independence: 'LOW',
        size: 'MEDIUM',
        user_id: 'user_01',
      },
      [],
    )

    const { pets } = await sut.execute({
      city: 'Recife',
      page: 1,
    })

    console.log(pets)

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Jose', city: 'Recife' }),
      expect.objectContaining({ name: 'Morango', city: 'Recife' }),
    ])
  })

  it('should be able to fetch paginated pets by city', async () => {
    for (let i = 1; i <= 22; i++) {
      await petsRepository.create(
        {
          name: `Dog ${i}`,
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
    }

    const { pets } = await sut.execute({
      city: 'Recife',
      page: 2,
    })

    console.log(pets)

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Dog 21' }),
      expect.objectContaining({ name: 'Dog 22' }),
    ])
  })
})
