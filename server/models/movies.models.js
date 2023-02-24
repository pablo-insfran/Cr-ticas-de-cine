const mongoose = require("mongoose");

const MoviesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Movie title is required."]
    },
    moviesreview: [
        {
            name: {
                type: String,
                required: [true, "Name Review is required."]
            },
            rating: {
                type: Number,
                enum: [1, 2, 3, 4, 5],
                required: [true, "Rating Review is required."]
            },
            review: {
                type: String,
                required: [true, "Review is required."]
            }
        }
    ]
},
    { timestamps: true }
)

const Movies = mongoose.model("Movies", MoviesSchema);

module.exports = Movies;