import logger from './logger'
import app from './app'
import models from './db/models'

export const host = process.env.HOST || '127.0.0.1'
export const port: number = Number.parseInt(process.env.PORT) || 5000


function start() {
  models.sequelize.sync(
      {force:true}
    ).then(()=>{
    console.log('sync()')
    app.listen(port, () => {
      logger.log({
        level: 'info',
        message: `[${app.env}] Server listening on http://${host}:${port}`,
      })
    })
  }).catch(e=>{
    console.error(e);
  });
}

start()
