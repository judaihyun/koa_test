import logger from './logger'
import app from './app'

export const host = process.env.HOST || '127.0.0.1'
export const port: number = Number.parseInt(process.env.PORT) || 5000

async function start() {
  app.listen(port, () => {
    logger.log({
      level: 'info',
      message: `[${app.env}] Server listening on http://${host}:${port}`,
    })
  })
}

start()
