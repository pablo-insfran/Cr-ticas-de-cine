const MoviesControllers = require("../controllers/movies.controllers")
const { authenticate } = require("../config/jw.config")

module.exports = app => {
    // Nuevo Producto OK 
    app.post("/api/movies/new", MoviesControllers.createMovies);

    //Modificar un Movies OK
    app.post("/api/movies/:id/review", MoviesControllers.updateMovies);

    //Mostrar Todos los Movies OJO
    app.get("/api/movies", MoviesControllers.allMovies);

    //Mostrar solo un Movies OK
    app.get("/api/movies/:id", MoviesControllers.oneMovies);

    //Eliminar un Movies  Ok
    app.delete("/api/delete/:id", MoviesControllers.deleteMovies);
}

