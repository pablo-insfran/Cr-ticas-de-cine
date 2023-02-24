const Movies = require("../models/movies.models")

module.exports.createMovies = (req, res) => {
    Movies.create(req.body)
        .then(newMovies => res.json({ result: newMovies }))
        .catch(error => res.status(400).json({ message: "Algo salió mal Create", error: error }))
};

module.exports.updateMovies = (req, res) => {
    Movies.updateOne({ _id: req.params.id }, { $push: { moviesreview: (req.body) } })
        .then(update => res.json({ result: update }))
        .catch(error => res.status(400).json({ message: "Algo salió mal Update Movies", error: error }))
};
// Mostrar Todos los Movies OJO
module.exports.allMovies = (req, res) => {
    Movies.aggregate([{ "$unwind": "$moviesreview" }, { "$group": { "_id": "$_id", "nombreMovie": { "$last": "$title" }, "promedio": { "$avg": "$moviesreview.rating" } } }])
        .then(allMovies => res.json({ result: allMovies }))
        .catch(error => res.status(400).json({ message: "Algo salió mal", error: error }))
};

module.exports.oneMovies = (req, res) => {
    Movies.findById(req.params.id)
        .then(movies => res.json({ result: movies }))
        .catch(error => res.status(400).json({ message: "Algo salió mal", error: error }))
};

module.exports.deleteMovies = (req, res) => {
    Movies.deleteOne({ _id: req.params.id })
        .then(result => res.json({ result: result }))
        .catch(error => res.status(400).json({ message: "Algo salió mal", error: error }))
};