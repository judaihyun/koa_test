import logger from './logger'
import app, { host, port } from './app'

async function start() {
  app.listen(port, () => {
    logger.log({
      level: 'info',
      message: `[${app.env}] Server listening on http://${host}:${port}`,
    })
  })
}

start()
