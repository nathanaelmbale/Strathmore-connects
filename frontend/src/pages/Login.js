import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async (e) => {
      e.preventDefault()

      await login(email, password)
      console.log(email,password)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>Log ins</p>
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
        <button disabled={isLoading}>Log in</button>
        {error && <div className='alert alert-danger'>{error}</div>}
      </form>
    </>
  )
}

export default Login