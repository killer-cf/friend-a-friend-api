import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to register an user', async () => {
    const { pet } = await sut.execute({
      name: 'Jose',
      about: 'Cachorinho muito legal e dócil',
      space: 'BIG',
      age: 'JUVENILE',
      energy: 'HIGH',
      independence: 'LOW',
      size: 'MEDIUM',
      requirements: [],
      user_id: 'user_01',
    })

    expect(pet.name).toEqual('Jose')
    expect(pet.about).toEqual('Cachorinho muito legal e dócil')
    expect(pet.space).toEqual('BIG')
    expect(pet.age).toEqual('JUVENILE')
    expect(pet.energy).toEqual('HIGH')
    expect(pet.size).toEqual('MEDIUM')
    expect(pet.user_id).toEqual('user_01')
    expect(pet.independence).toEqual('LOW')
  })
})
