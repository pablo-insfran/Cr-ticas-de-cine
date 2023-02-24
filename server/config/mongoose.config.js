const mongoose = require('mongoose');

// Conectar al MONGODB
mongoose.set('strictQuery', true)
mongoose.connect('mongodb://127.0.0.1:27017/movies', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Estableció una conexión a la base de datos - MongoDB -..'))
    .catch(error => console.log('Algo salió mal al conectarse a la base de datos.', error));