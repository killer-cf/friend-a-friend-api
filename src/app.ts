import fastify from 'fastify'
import { userRoutes } from './http/controllers/user/routes'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { petsRoutes } from './http/controllers/pet/routes'
import { ZodError } from 'zod'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(userRoutes)

app.register(petsRoutes)

app.setErrorHandler((error, _, res) => {
  if (error instanceof ZodError) {
    return res
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return res.status(500).send({ message: 'Internal server error.' })
})
