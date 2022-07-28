const Joi = require('@hapi/joi')
const { Model } = require('objection')
const db = require('../config/db.connection')

Model.knex(db)

class CrudModel extends Model {
    static get tableName() {
        return 'data'
    }
    static get joiSchema() {
        Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
            age: Joi.number()
        })
        let data = schemaValidate.validate(req.payload)
        if (data.error) {
            return ("please fill all the fields properly")

        }

    } catch(error) {
        return (error.message)
    }
}

module.exports = CrudModel