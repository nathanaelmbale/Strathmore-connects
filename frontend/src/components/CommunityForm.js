import React, { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCommunityContext } from '../hooks/useCommunityContext'

const CommunityForm = () => {
  const [description, setDescription] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState('')
  //context
  const { user } = useAuthContext()
  const { dispatchCommunity } = useCommunityContext()


  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const email = user.email

    const community = { name, description, email }
    try {
      const response = await fetch('https://strathmoreconnects-backend.onrender.com/community/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(community)
      });

      const json = await response.json();
      if (response.ok) {
        setName('');
        setDescription('');
        console.log(json)
        dispatchCommunity({ type: 'SET_COMMUNITIES', payload: json });
      } else {
        console.log('Error:', json)
        setError(json.error)

      }
    } catch (error) {
      console.log(error.message);
      setError(error.message)
    }
  };


  return (
    <>
      {user && user.admin === true ?
        <form onSubmit={handleSubmit} className='px-5 py-2' >
          <h2 className='text-2xl font-bold'>Community form</h2>

          <div className="md-input-box">
            <input
              name="name"
              className="md-input m-0.5"
              type="text"
              placeholder=""
              autoComplete='off'
              value={name}
              onChange={(e) => setName(e.target.value)} />
            <label for="Description" className="md-label text-md">Name</label>
            <div className="md-input-underline" />

          </div>

          <div className="md-input-box">
            <input
              id="Description"
              name="Description"
              className="md-input m-0.5"
              type="text"
              placeholder=""
              autoComplete='off'
              value={description}
              onChange={(e) => setDescription(e.target.value)} />
            <label for="Description" className="md-label text-md">Description</label>
            <div className="md-input-underline" />

          </div>

          <div className=' my-3'>
            <button type="submit" className='  w-full items-center  mt-2 px-3 py-2 text-sm font-medium text-center
                    text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none
                    focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700
                     dark:focus:ring-blue-800'>Create</button>
            {error && <div className='alert alert-danger mt-3'>{error}</div>}
          </div>
        </form>
        : null}

    </>
  )
}

export default CommunityForm