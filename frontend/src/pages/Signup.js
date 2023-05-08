import React, { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import Logo from '../images/logo.png'


const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, isLoading, error } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(name, email, password)
  }

  return (
    <div className='w-full h-screen'>
      <form className='mx-auto shadow-lg flex items-center w-9/12 bg-white rounded-2xl p-10'
        onSubmit={handleSubmit}>
        <div className="w-full">
          <center>
            <img className="mb-3 w-20" alt='strathmore connect logo' src={Logo}></img>
          </center>
          <h3 className='text-3xl font-bold'><center>Sign up</center></h3>
          <div className='mt-3'>
            <label className='form-label'>Name</label>
            <input
              type="text"
              onChange={(e) => { setName(e.target.value) }}
              value={name}
              name="name"
              placeholder='name'
              autoComplete='on'
              className="block w-full p-2 text-md text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
            />
          </div>
          <div className='mt-3'>
            <label className='form-label'>Email</label>
            <input
              type="email"
              onChange={(e) => { setEmail(e.target.value) }}
              value={email}
              name="email"
              placeholder='email'
              autoComplete='off'
              className="block w-full p-2 text-md text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
            />
          </div>

          <div className='mt-3'>
            <label className='form-label'>Password</label>

            <input
              type="password"
              onChange={(e) => { setPassword(e.target.value) }}
              value={password}
              name="password"
              placeholder='password'
              autoComplete='off'
              className="block w-full p-2 text-md text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
            />
          </div>
          <button disabled={isLoading} 
          className='w-full mt-5 items-center px-3 py-2 text-sm font-medium text-center
          text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none
          focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700
           dark:focus:ring-blue-800'>Sign up</button>
          {error && <div className='alert alert-danger mt-3'>{error}</div>}
        </div>
      </form>
    </div>
  )
}

export default Signup