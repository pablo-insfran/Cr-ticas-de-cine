import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import NavBar from './NavBar';

const MoviesList = ({ socket }) => {

  const [listmovies, setListmovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/movies', { withCredentials: true })
      .then((result) => {
        console.log("MoviesList", result.data.result)
        setListmovies(result.data.result)
      })
      .catch((error) => {
        console.log("Algo salió mal- MoviesList -", error)
      })
  }, [])

  socket.on('MoviesDelete', (idDelet) => {
    console.log("Delete Movie con id:", idDelet)
    setListmovies(listmovies.filter((movie) => movie._id !== idDelet))
  })

  return (
    <div>
      <div>

        <NavBar />
      </div>
      <div className="container-md">
        <div>
          <Link to={'/movies/new'} className="btn btn-outline-primary">Read Reviews</Link>
        </div>
        <table className='table' >
          <thead>
            <tr>
              <th scope="col">Movie Title</th>
              <th scope="col">Avg. Rating</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>

            {listmovies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.nombreMovie}</td>
                <td>{movie.promedio}</td>
                <td>
                  <div className="">
                    <Link to={`/movies/${movie._id}`} className="btn btn-success">Read Reviews</Link>
                    <Link to={`/movies/${movie._id}/review`} className="btn btn-success">Write a Review</Link>
                  </div>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MoviesList
