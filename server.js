const Hapi = require('@hapi/hapi');

const server = Hapi.server({
    port: 5000,
    host: 'localhost'
});


process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

const CrudRoutes = require('./routes/crud.routes')
const router = new CrudRoutes


// CREATE data
server.route({
    method: 'POST',
    path: '/create',
    handler: router.createData
});


// READ data by ID
server.route({
    method: 'GET',
    path: '/read/{id}',
    handler: router.readData
});


// UPDATE data by ID
server.route({
    method: 'PUT',
    path: '/update/{id}',
    handler: router.updateData
});

// DELETE data by ID
server.route({
    method: 'DELETE',
    path: '/delete/{id}',
    handler: router.deleteData
});

// if you lost then
server.route({
    method: ['GET', 'POST', 'PUT', 'DELETE'],
    path: '/{any*}',
    handler: router.ivNot4
});


server.start();
console.log('Server running on %s', server.info.uri);