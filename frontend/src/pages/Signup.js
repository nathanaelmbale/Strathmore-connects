import React, { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, isLoading, error } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(name ,email, password)
  }

  return (
    <>
      <form className='container' onSubmit={handleSubmit}>
        <div className="conatiner">
          <h3><center>Sign up</center></h3>
          <div className='form-group'>
            <label className='form-label'>Name</label>
            <input
              type="text"
              onChange={(e) => { setName(e.target.value) }}
              value={name}
              name="name"
              autoComplete='on'
              className='form-control'
            />
          </div>
          <div className='form-group'>
            <label className='form-label'>Email</label>
            <input
              type="email"
              onChange={(e) => { setEmail(e.target.value) }}
              value={email}
              name="email"
              autoComplete='off'
              className='form-control'
            />
          </div>

          <div className='form-group'>
            <label className='form-label'>Password</label>

            <input
              type="password"
              onChange={(e) => { setPassword(e.target.value) }}
              value={password}
              name="password"
              autoComplete='off'
              className='form-control'
            />
          </div>
          <button disabled={isLoading} className='btn btn-primary container'>Sign up</button>
          {error && <div className='alert alert-danger mt-3'>{error}</div>}
        </div>
      </form>
    </>
  )
}

export default Signup