import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='row justify-content-between'>
      <div className="col-4">
        <h2 className='text-uppercase'> Moldy Tomatoes</h2>
      </div>
      <div className="col-4">
        <NavLink to="/" className="btn btn-success"> Logout </NavLink>
      </div>
    </div>
  )
}

export default NavBar
