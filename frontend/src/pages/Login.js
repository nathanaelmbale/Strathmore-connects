import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import '../styles/main.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
    console.log(email, password)
  }

  return (
    <>
      <form className='container vh-100 d-flex flex-column align-items-center justify-content-center' onSubmit={handleSubmit}>
        <div className="container ">
          <h3><center>Log in page</center></h3>

          <div className='form-group'>
            <label className='form-label'>Email</label>

            <input
              type="email"
              onChange={(e) => { setEmail(e.target.value) }}
              value={email}
              className='form-control'
              name="email"
              autoComplete='off'
            />
          </div>
          <div className='form-group'>

            <label className='form-label'>Password</label>

            <input
              type="password"
              onChange={(e) => { setPassword(e.target.value) }}
              value={password}
              name="password"
              className='form-control'
              autoComplete='off'
            />
          </div>

          <button disabled={isLoading} className='btn btn-primary container'>
            Log in
          </button>
          {error && <div className='alert alert-danger'>{error}</div>}
        </div>
      </form>
    </>
  )
}

export default Login