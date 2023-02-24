import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"


const LoginRegistration = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmpassword] = useState('')

    const navigate = useNavigate();

    const submitRegister = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/registration', {
            firstName, lastName, email, password, confirmpassword
        }, { withCredentials: true })
            .then((res) => {
                console.log("Result Usuario Creado => ", res.data.user)
                navigate("/")
            }).catch((err) => {
                console.log("Error Usuario Creado => ", err)
            })
    }

    const submitLogin = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/login', {
            email, password
        }, { withCredentials: true, credentials: 'include' })
            .then((res) => {
                console.log(res, "entro aca");
                navigate('/movies')
            }).catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='d-flex '>
            <section className='container-sm'>
                <form onSubmit={submitRegister}>
                    <legend>Register</legend>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">First Name: </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Last Name: </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" onChange={(e) => setLastName(e.target.value)} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Email: </label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Password: </label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Confirm Password: </label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" onChange={(e) => setConfirmpassword(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </section>
            <section className='container-sm'>
                <form onSubmit={submitLogin}>
                    <legend>Login</legend>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Email: </label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Password: </label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default LoginRegistration