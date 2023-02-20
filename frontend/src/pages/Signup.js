import React, { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, isLoading, error } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(email, password)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>Sign up</p>
        <label>Email</label>

        <input
          type="email"
          onChange={(e) => { setEmail(e.target.value) }}
          value={email}
          name="email"
          autoComplete='off'
        />

        <label>Password</label>

        <input
          type="password"
          onChange={(e) => { setPassword(e.target.value) }}
          value={password}
          name="password"
          autoComplete='off'
        />
        <button disabled={isLoading} className=''>Sign up</button>
        {error && <div className='alert alert-danger'>{error}</div>}
      </form>
    </>
  )
}

export default Signup