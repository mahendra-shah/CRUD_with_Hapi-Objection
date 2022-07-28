const Crud = require("../model/crud.mode");

class CrudRoutes {

    // CREATE
    createData = async (req, h) => {
        try {
            const isData = await Crud.query().where({ email: req.payload.email })
            if (isData.length === 0) {
                await Crud.query().insert(req.payload);
                return h.response('Data inserted').code(200)
            }
            return h.response('Data already exixts').code(400)
        } catch (error) {
            console.log(error)
            return h.response({ Error: 'Internal server error.' }).code(500)
        }
    }


    // READ...
    readData = async (req, h) => {
        try {
            const id = parseInt(req.params.id);
            const result = await Crud.query().where({ id })
            return h.response(result ? result : 'There is no data.').code(200)
        } catch (error) {
            return h.response({ Error: 'Internal server error.' }).code(500)
        }
    }

    // UPDATE
    updateData = async (req, h) => {
        try {
            const id = parseInt(req.params.id);
            const isData = await Crud.query().where({ id })
            if (isData.length === 0) {
                return h.response('data not found').code(404)
            }
            await Crud.query().update(req.payload).where({ id })
            return h.response('Data updated').code(200)
        } catch (error) {
            return h.response({ Error: 'Internal server error.' }).code(500)
        }
    }

    // DELETE
    deleteData = async (req, h) => {
        try {
            const id = parseInt(req.params.id);
            const isData = await Crud.query().where({ id })
            if (isData.length === 0) {
                return h.response('data not found').code(404)
            }
            await Crud.query().deleteById(id)
            return h.response('Data deleted').code(200)
        } catch (error) {
            return h.response({ Error: 'Internal server error.' }).code(500)
        }
    }

    // 404
    ivNot4 = () => {
        return ({msg: 'Lookes like you lost please go through the code ...'})
    }


}

module.exports = CrudRoutes;