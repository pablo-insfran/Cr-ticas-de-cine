import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import LoginRegistration from './components/LoginRegistration';
import MoviesList from './components/MoviesList';
import MoviesNew from './components/MoviesNew';
import MoviesView from './components/MoviesView';
import MoviesReview from './components/MoviesReview';


function App() {

  const [socket] = useState(() => io(":8000"))

  useEffect(() => {
    socket.on('connection', () => {
      console.log('Conexion Establecida al Server - Socket-io')
    })
    return () => socket.disconnect(true);
  }, [])


  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginRegistration />} />
          <Route path='/movies' element={<MoviesList socket={socket} />} />
          <Route path='/movies/new' element={<MoviesNew />} />
          <Route path='/movies/:id' element={<MoviesView socket={socket} />} />
          <Route path='/movies/:id/review' element={<MoviesReview />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
