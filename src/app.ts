import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import router from './router'
import jwt from 'koa-jwt'
import logger from './logger'
import { jwtMiddleware } from './lib/jwt/jwtMiddleware'

const app = new Koa()
const Logger = function (req) {
  logger.log(`LOGGER - ${req.requestTime} : `, req.body, req.query);
};

app
  .use(bodyParser())
  .use(jwtMiddleware)
  .use(router.routes())
  .use(router.allowedMethods())
  .use(cors())
  .use(Logger)
  .use(
    jwt({
      secret: process.env.JWT_SECRET,
      // audience: process.env.JWT_AUDIENCE,
      // issuer: process.env.JWT_ISSUER,
    }),
  )

export default app
