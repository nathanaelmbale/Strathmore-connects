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
      const response = await fetch('/community/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(community)
      });

      const json = await response.json();
      if (response.ok) {
        console.log('Success:', json.message);
        setName('');
        setDescription('');
        dispatchCommunity({ type: 'SET_COMMUNITIES', payload: json.message });
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
        <form onSubmit={handleSubmit} className='container' >
          <h2>Community form</h2>
          <div className="form-group">
            <label>Community name</label>
            <input className="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)} />

          </div>

          <div className="form-group">
            <label>Description:</label>
            <input className="form-control" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className=' my-3'>
            <button type="submit" className='btn btn-primary container '>Submit</button>
            {error && <div className='alert alert-danger mt-3'>{error}</div>}
          </div>
        </form>
        : null}

    </>
  )
}

export default CommunityForm