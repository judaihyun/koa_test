
module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './db.sqlite',
    // storage: ':memory:',
    /*
    dialectOptions:{
      cached: 'shared',
    }
    */
  },
  production: {
    dialect: 'sqlite',
    storage: ':memory:',
    // cached: 'shared',
  }
};