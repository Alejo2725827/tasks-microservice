const express = require('express');

require('dotenv').config(); // Enviroments

const http = require('http');
const cors = require('cors')

const corsOptions = {
    origin: ['http://localhost:4200'],
    // origin: true,
    methods: [
        'POST',
        'GET',
        'PUT',
        'DELETE',
        'PUT',
        'PATCH',
        'OPTIONS',
    ],
    allowedHeaders: [
        'authorization',
        'xAuth',
        'Content-Type',
        'X-Requested-With',
        'rol'
    ],
    exposedHeaders: [
        'authorization', 'xAuth', 'Content-Type', 'Accept'
    ],
    credentials: true
}

const app = express();

//Rutas
const routes = require('./routing');
const { verifyToken } = require('./middlewares/verify_token');

class Server {
    constructor() {
        this.init();
    }

    init() {
        this.connectMongoDb();
        this.useMiddleWares();
        this.addRoutes();
        this.listenServer();
    }
    connectMongoDb() {
        require('./database/mongo.connection')
    }

    useMiddleWares() {
        app.use(cors(corsOptions))
        app.use(verifyToken)
        app.use(express.json({ limit: '50mb' })); // Parser JSON
        app.use(express.urlencoded({ limit: '50mb', extended: true })); // Parser URL encoded
    }
    
    addRoutes() {
        app.use(`/tasks`, routes.task);
    }

    listenServer() {

        const server = http.createServer(app);
        server.listen(process.env.PORT, () => {
            console.log(`Servidor HTTP en ejecución en el puerto ${process.env.PORT}`);
        });
        return server;

    }

}

new Server();