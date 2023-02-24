import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom'
import NavBar from './NavBar'

const MoviesReview = () => {
  const [movie, setMovie] = useState({})
  const [name, setName] = useState('')
  const [rating, setRating] = useState('')
  const [review, setReview] = useState('')

  const [danger, setDanger] = useState({})

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:8000/api/movies/${id}`)
      .then((result) => {
        console.log("MoviesReview - Title", result.data.result.title)
        setMovie(result.data.result)
      })
      .catch((error) => { console.log("Algo salió mal - MoviesView", error) })
  }, [])


  const submitHandler = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8000/api/movies/${id}/review`, {
      name,
      rating,
      review
    })
      .then((result) => {
        console.log("Movies Review", result)
        navigate(`/movies/${id}`)
      })
      .catch((error) => {
        console.log("Algo salió mal - Movies Review", error)
        setDanger(error.response.data.error.errors)
      })
  }

  return (
    <div>
      <div>
        <NavBar />
        <div className="container-md">
          <h3>Add a Review for {movie.title}</h3>
          <form onSubmit={submitHandler}>
            <div>
              <label htmlFor="">Your Name</label>
              <input type="text" onChange={(e) => setName(e.target.value)} />
              {danger.name ? <span className='text-danger'>{danger.name.message}</span> : null} <br />
            </div>
            <div>
              <label htmlFor="">Rating </label>
              <select className='form-control' onChange={(e) => setRating(e.target.value)}>
                <option>Select A Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div>
              <label htmlFor="">Your Review</label>
              <input type="text" onChange={(e) => setReview(e.target.value)} />
              {danger.review ? <span className='text-danger'>{danger.review.message}</span> : null} <br />
            </div>
            <button type="submit" className="btn btn-success">Submit</button>
            <Link to={'/movies/'} className="btn btn-danger">Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MoviesReview
