import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

describe('Filter Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it.only('should be able to filter pets', async () => {
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
    await prisma.pet.createMany({
      data: [
        {
          name: 'Jose filtered',
          about: 'Cachorinho muito legal e dócil',
          space: 'BIG',
          age: 'JUVENILE',
          city: 'Recife',
          energy: 'MEDIUM',
          independence: 'HIGH',
          size: 'MEDIUM',
          user_id: user.id,
        },
        {
          name: 'Alfredo filtered',
          about: 'Cachorinho muito legal e dócil',
          space: 'BIG',
          age: 'JUVENILE',
          city: 'Recife',
          energy: 'MEDIUM',
          independence: 'HIGH',
          size: 'MEDIUM',
          user_id: user.id,
        },
        {
          name: 'Dogu',
          about: 'Cachorinho muito legal e dócil',
          space: 'BIG',
          age: 'JUVENILE',
          city: 'Recife',
          energy: 'HIGH',
          independence: 'LOW',
          size: 'MEDIUM',
          user_id: user.id,
        },
      ],
    })

    const response = await request(app.server)
      .get(`/pets/filters`)
      .query({
        city: 'Recife',
        energy: 'MEDIUM',
        independence: 'HIGH',
      })
      .send()

    expect(response.status).toEqual(200)
    expect(response.body.pets).toHaveLength(2)
    expect(response.body.pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Alfredo filtered' }),
        expect.objectContaining({ name: 'Jose filtered' }),
      ]),
    )
  })
})
