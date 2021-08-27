import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import router from './router'
import logger from './logger'
import { jwtMiddleware } from './lib/jwt/jwtMiddleware'
import { koaSwagger } from 'koa2-swagger-ui';
import yamljs from 'yamljs';

const app = new Koa()
const Logger = function (req) {
  logger.log(`LOGGER - ${req.requestTime} : `, req.body, req.query);
};


const spec = yamljs.load('./swagger-config.yaml');

app
  .use(
    koaSwagger({
      routePrefix: '/api-docs',
      swaggerOptions: {
        spec,
      },
    }),
  )
  .use(bodyParser())
  .use(jwtMiddleware)
  .use(router.routes())
  .use(router.allowedMethods())
  .use(cors())
  .use(Logger)

export default app
