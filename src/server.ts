import logger from './logger'
import app from './app'
import models from './db/models'
import { exec } from 'child_process';

export const host = process.env.HOST || '127.0.0.1'
export const port: number = Number.parseInt(process.env.PORT) || 5000


function start() {
  models.sequelize.sync(
    { force: true }
  ).then(async() => {
    console.log('sync()')
    migrate();
    seeding();
    app.listen(port, () => {
      logger.log({
        level: 'info',
        message: `[${app.env}] Server listening on http://${host}:${port}`,
      })
    })
  }).catch(e => {
    console.error(e);
  });
}

function migrate() {
  console.log('seeding....')
  new Promise((resolve, reject) => {
    const migrate = exec(
      'sequelize db:migrate',
      { env: process.env },
      err => (err ? reject(err) : resolve)
    );

    migrate.stdout.pipe(process.stdout);
    migrate.stderr.pipe(process.stderr);
  });

}

function seeding() {
  new Promise((resolve, reject) => {
    const migrate = exec(
      'sequelize db:seed:all',
      { env: process.env },
      err => (err ? reject(err) : resolve)
    );

    // Forward stdout+stderr to this process
    migrate.stdout.pipe(process.stdout);
    migrate.stderr.pipe(process.stderr);
  });
}


start()
