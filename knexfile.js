// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: 'Hapi',
      user:     'root',
      password: 'Mahendra@1'
    }
  }

};
