const Hapi = require('@hapi/hapi')
const Joi = require('@hapi/joi');
const CrudServices = require('./serevice/crud.service');
const services = new CrudServices()

const init = async () => {

    const server = Hapi.server({
        port: 5000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (req, h) => {
            return "<h1>I'm Working</h1>"
        }
    });

    // create
    server.route({
        method: 'post',
        path: '/create',
        options: {
            validate: {
                payload: Joi.object({
                    name: Joi.string().required(),
                    email: Joi.string().email().required(),
                    age: Joi.number()
                })
            },
        },
        handler: async (req, h) => {
            try {
                // console.log(req.payload);
                const result = await services.create(req.payload)
                if (!result) {
                    return h.response("already exists").code(400)
                }
                return h.response(result).code(201)
            } catch (error) {
                return h.response("I'm post").code(500)
            }
        }
    })

    // read
    server.route({
        method: 'get',
        path: '/read/{id}',
        handler: async (req, h) => {
            try {
                const id = parseInt(req.params.id)
                const result = await services.read(id)
                if (!result.error) {
                    return h.response(result).code(200)
                }
                return h.response("data not found").code(400)

            } catch (error) {
                return h.response("internal error").code(500)
            }
        }
    })

    // update
    server.route({
        method: 'put',
        path: '/update/{id}',
        handler: async (req, h) => {
            try {
                const id = parseInt(req.params.id)
                const result = await services.update(id, req.payload)
                if (!result.error) {
                    return h.response(result).code(200)
                }
                return h.response("data not found").code(400)

            } catch (error) {
                return h.response("internal error").code(500)
            }
        }
    })

    // delete
    server.route({
        method: 'delete',
        path: '/delete/{id}',
        handler: async (req, h) => {
            try {
                const id = parseInt(req.params.id)
                const result = await services.delete(id)
                if (!result.error) {
                    return h.response(result).code(200)
                }
                return h.response("data not found").code(400)

            } catch (error) {
                return h.response("internal error").code(500)
            }
        }
    })



    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();