import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FilterPetsUseCase } from './filter-pets'

let petsRepository: InMemoryPetsRepository
let sut: FilterPetsUseCase

describe('Filter pets Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FilterPetsUseCase(petsRepository)
  })

  it('should be able to filter pets', async () => {
    await petsRepository.create(
      {
        name: 'Jose',
        about: 'Cachorinho muito legal e dócil',
        space: 'BIG',
        age: 'JUVENILE',
        city: 'Recife',
        energy: 'HIGH',
        independence: 'HIGH',
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
        city: 'Recife',
        energy: 'HIGH',
        independence: 'LOW',
        size: 'MEDIUM',
        user_id: 'user_01',
      },
      [],
    )

    const { pets } = await sut.execute({
      city: 'Recife',
      size: 'MEDIUM',
      independence: 'LOW',
      page: 1,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Morango',
        city: 'Recife',
        independence: 'LOW',
        size: 'MEDIUM',
      }),
      expect.objectContaining({
        name: 'Bono',
        city: 'Recife',
        independence: 'LOW',
        size: 'MEDIUM',
      }),
    ])
  })

  it('should be able to filter pets paginated', async () => {
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
      size: 'MEDIUM',
      independence: 'LOW',
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Dog 21' }),
      expect.objectContaining({ name: 'Dog 22' }),
    ])
  })
})
