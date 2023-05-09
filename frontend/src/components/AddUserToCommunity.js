import React, { useState, useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCommunityContext } from '../hooks/useCommunityContext'

const AddUserToCommunity = () => {
  const { user } = useAuthContext()

  const { communities, dispatchCommunity } = useCommunityContext()
  const [community, setCommunity] = useState(null)
  const [email, setEmail] = useState("")
  const [userId, setUserId] = useState("")
  const [userError, setUserError] = useState("")
  const [userSuccess, setUserSuccess] = useState("")


  useEffect(() => {

    const fetchCommunity = async () => {
      const response = await fetch('https://strathmoreconnects-backend.onrender.com/community', {
        headers: { 'Authorization': `Bearer ${user.token}` },
      })

      const json = await response.json()

      if (response.ok) {
        dispatchCommunity({ type: 'SET_COMMUNITIES', payload: json })
      }
    }

    if (user) fetchCommunity()

  }, [user, dispatchCommunity])

  const removeUser = async () => {
    setUserSuccess(null)

    const response = await fetch('https://strathmoreconnects-backend.onrender.com/community/unjoin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({ communityId: community, accountId: userId })
    })

    if (response.ok) {
      setUserSuccess("Succesful")
    }
  }

  const handleAddUser = async (e) => {
    e.preventDefault()
    setUserError("")
    setEmail("")
    const _id = community
    console.log("community", community)
    try {
      const response = await fetch('community/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ email, _id })
      })
      if (!response.ok) {
        setUserError("User not found")
      }
      const json = await response.json()
      console.log(json)
      const userr = JSON.stringify(json)

      setUserId(userr)

      if (json.userId) removeUser()


    } catch (error) {
      setUserError("User not found")
    }



    setCommunity(" ")
  }
  return (
    <div className=''>
      <h2 className='text-3xl font-bold'>Add user to community</h2>
      <form onSubmit={handleAddUser}>
        <div className="form-group">
          <div className='block'>
            <label className='py-5'>Community</label>
            <select value={community} className="md-input rounded-xl pl-4" 
            onChange={(e) => setCommunity(e.target.value)}>
              <option value="">Select a community</option>
              {communities && communities.map(communite => (

                <option key={communite._id} value={communite._id}>
                  {communite.name}
                </option>

              ))}
            </select>
          </div>
          <div>
          <div className=''>
          <label className='block'>Email</label>
          <input 
          type="text" 
          className="block w-full p-2 text-md text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
          placeholder='Type in your email' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}></input>
          </div>
          <div className='my-3'>
            <button type='submit' 
             className='inline-flex items-center  mt-2 px-3 py-2 text-sm font-medium text-center
             text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none
             focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700
              dark:focus:ring-blue-800' >Add user</button>
            {userError && <div className='alert alert-danger mt-3'>{userError}</div>}
            {userSuccess && <div className='success alert-success mt-3'>{userSuccess}</div>}
          </div>
          </div>
        </div>




      </form>
    </div>
  )
}

export default AddUserToCommunity