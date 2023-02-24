//Configuracion Express
const express = require('express')
const app = express()
const PORT = 8000
//Configuracion CORS
const cors = require('cors')
//CookieParse
const cookieParser = require('cookie-parser')

//Dotenv
require('dotenv').config()

//Socket io
const socket = require('socket.io')
const Movies = require('./models/movies.models')

//Middleware Express
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
//Middleware CookieParse
app.use(cookieParser())

//Configuracion Base de Datos
require('./config/mongoose.config');

//Enrutamiento Movies
const MoviesRoutes = require('./routes/movies.routes');
MoviesRoutes(app);
//Enrutamiento User
const UserRoutes = require('./routes/users.routes');
UserRoutes(app);

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})

//Configuracion Cabecera Socket io
const io = socket(server, {
    cors: {
        origin: "*",
        methods: ['POST', 'GET']
    }
})

io.on('connection', (socket) => {
    console.log('Usuario Conectado', socket.id)
    socket.on("DeleteMovie", (payload) => {
        Movies.deleteOne({ _id: payload })
            .then((result) => { io.emit('Movie Borrado - Socket io', payload) })
            .catch((error) => { console.log('Error Movie Borrado - Socket io', error) })
    })

    socket.on("disconnect", (socket) => {
        console.log(`El User con id ${socket.id} acaba de salir`)
    })
})