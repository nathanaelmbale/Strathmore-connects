import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import '../styles/main.css'
import Logo from '../images/logo.png'

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
    <div className='w-full h-screen '>
      <form className='mx-auto flex  shadow-lg items-center w-9/12 bg-white rounded-2xl p-10' onSubmit={handleSubmit}>
        <div className="container ">
          <center>
            <img className="mb-3 w-20" alt='strathmore connect logo' height='30px' src={Logo}></img>

          </center>
          <h3 className='text-3xl font-bold'><center>Log in form</center></h3>

          <div className='mt-3'>
            <label>Email</label>

            <input
              type="email"
              onChange={(e) => { setEmail(e.target.value) }}
              value={email}
              className="block w-full p-2 text-md text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
              name="email"
              autoComplete='on'
              placeholder='email'
            />
          </div>
          <div className='mt-3'>

            <label>Password</label>

            <input
              type="password"
              onChange={(e) => { setPassword(e.target.value) }}
              value={password}
              name="password"
              className="block w-full p-2 text-md text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
              autoComplete='on'
              placeholder='password'
            />
          </div>

          <button disabled={isLoading} 
          className='w-full items-center  mt-2 px-3 py-2 text-sm font-medium text-center
          text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none
          focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700
           dark:focus:ring-blue-800'>
            Log in
          </button>
          {error && <div className='alert alert-danger mt-3'>{error}</div>}
        </div>
      </form>
    </div>
  )
}

export default Login