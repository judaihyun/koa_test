import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import router from './router'
import jwt from 'koa-jwt'

const app = new Koa()
export const host = process.env.HOST || '127.0.0.1'
export const port: number = Number.parseInt(process.env.PORT) || 5000

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(cors())
  .use(
    jwt({
      secret: process.env.JWT_SECRET,
      // audience: process.env.JWT_AUDIENCE,
      // issuer: process.env.JWT_ISSUER,
    }),
  )

export default app
