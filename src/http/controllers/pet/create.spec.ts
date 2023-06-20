import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token, user } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post(`/${user.id}/pets`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Jose',
        about: 'Cachorinho muito legal e dócil',
        space: 'BIG',
        age: 'JUVENILE',
        city: 'Recife',
        energy: 'HIGH',
        independence: 'LOW',
        size: 'MEDIUM',
        requirements: [],
      })

    expect(response.status).toEqual(201)
  })
})
