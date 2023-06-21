import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

describe('List Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Jose',
        email: 'jose@gmail.com',
        phone: '81999999865',
        address: '123 Main Street',
        cep: '50720-570',
        password_hash: await hash('password', 6),
      },
    })
    const pet = await prisma.pet.create({
      data: {
        name: 'Jose',
        about: 'Cachorinho muito legal e dócil',
        space: 'BIG',
        age: 'JUVENILE',
        city: 'Recife',
        energy: 'HIGH',
        independence: 'LOW',
        size: 'MEDIUM',
        user_id: user.id,
      },
    })

    const response = await request(app.server).get(`/pets/${pet.id}`).send()

    expect(response.status).toEqual(200)
    expect(response.body.pet.name).toEqual('Jose')
  })
})
