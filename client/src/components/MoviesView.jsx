import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import NavBar from './NavBar';

const MoviesView = ({ socket }) => {

  const [movie, setMovie] = useState({})
  const [review, setReview] = useState([])
  const { id } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:8000/api/movies/${id}`)
      .then((result) => {
        console.log("MoviesView", result.data.result)
        console.log("MoviesView - ReviewList", result.data.result.moviesreview)
        setMovie(result.data.result)
        setReview(result.data.result.moviesreview)
      })
      .catch((error) => { console.log("Algo salió mal - MoviesView", error) })
  }, [])

  const deleteMovies = () => {
    socket.emit('DeleteMovie', id)
    navigate('/movies')

    //   axios.delete(`http://localhost:8000/api/delete/${id}`)
    //     .then((result) => {
    //       console.log("MoviesDelete", result.data.result)
    //       navigate('/movies')
    //     })
    //     .catch((error) => { console.log("Algo salió mal - ProductsDelete", error) })

  }
  return (
    <>
      <div>
        <NavBar />
        <div className="container-md">
          <h3>Review for {movie.title}</h3>
          <div>
            <table className='table' >
              <thead>
                <tr>
                  <th scope="col">Reviewer</th>
                  <th scope="col">Rating</th>
                  <th scope="col">Review</th>
                </tr>
              </thead>
              <tbody>
                {review.map((movies) => (
                  <tr key={movies._id}>
                    <td>{movies.name}</td>
                    <td>{movies.rating}</td>
                    <td>{movies.review}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button type="button" className="btn btn-danger" onClick={deleteMovies}>Delete Movie</button>
        </div>
      </div>
    </>
  )
}

export default MoviesView
