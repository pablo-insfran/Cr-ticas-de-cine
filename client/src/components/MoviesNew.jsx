import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'
import NavBar from './NavBar'

const MoviesNew = () => {

  const [title, setTitle] = useState('')
  const [name, setName] = useState('')
  const [rating, setRating] = useState('')
  const [review, setReview] = useState('')

  const [danger, setDanger] = useState({})

  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/movies/new', {
      title,
      moviesreview: {
        name,
        rating,
        review
      },
    })
      .then((result) => {
        console.log("MoviesNew", result)
        navigate('/movies')
      })
      .catch((error) => {
        console.log("Algo salió mal - MoviesNew", error)
        setDanger(error.response.data.error.errors)
      })
  }

  return (
    <div>
      <NavBar />
      <div className="container-md">
        <h3>Submit a Movie and a Review</h3>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="">Movie Title</label>
            <input type="text" onChange={(e) => setTitle(e.target.value)} />
            {danger.title ? <span className='text-danger'>{danger.title.message}</span> : null} <br />
          </div>
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
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
          <Link to={'/movies/'} className="btn btn-danger">Cancel</Link>
        </form>
      </div>
    </div>
  )
}

export default MoviesNew
