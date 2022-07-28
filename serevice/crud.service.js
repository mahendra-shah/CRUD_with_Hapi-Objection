const Crud = require("../model/crud.mode");

class CrudServices {

    // Create
    async create(data) {
        try {
            const isData = await Crud.query().where({ email: data.email })
            if (isData.length == 0) {
                await Crud.query().insert(data);
                return 'data inserted'
            }
            return
        } catch (error) {
            console.log(error);
            return { error: error.message }
        }
    }

    // Read
    async read(id){
        try {
            const Data = await Crud.query().where({ id })
            return Data 
        } catch (error) {
            return { error: error.message }
        }
    }

    // Update
    async update(id, data){
        try {
            const isData = await Crud.query().where({ id })
            if (isData.length == 0) {
                return 'nothing to update'
            }
            await Crud.query().update(data).where({id})
            return 'update success'
        } catch (error) {
            return { error: error.message }
        }
    }

    // Delete
    async delete(id){
        try {
            const isData = await Crud.query().where({ id })
            if (isData.length == 0) {
                return 'nothing to delete'
            }
            await Crud.query().deleteById(id)
            return 'delete success'
        } catch (error) {
            return { error: error.message }
        }
    }
}

module.exports = CrudServices