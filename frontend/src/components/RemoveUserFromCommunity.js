import React, { useState, useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCommunityContext } from '../hooks/useCommunityContext'

const RemoveUserFromCommunity = () => {
  const { user } = useAuthContext()

  const { communities, dispatchCommunity } = useCommunityContext()
  const [community, setCommunity] = useState(null)
  const [email, setEmail] = useState("")
  const [userId, setUserId] = useState("")
  const [userError, setUserError] = useState("")
  const [userSuccess, setUserSuccess] = useState("")


  useEffect(() => {

    const fetchCommunity = async () => {
      const response = await fetch('/community', {
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

    const response = await fetch('/community/unjoin', {
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

  const handleRemoveUser = async (e) => {
    e.preventDefault()
    setUserError("")
    setEmail("")
    try {
      const response = await fetch('user/find', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ email })
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
    <div>
      <h2>Remove user from community</h2>
      <form onSubmit={handleRemoveUser}>
        <div className="form-group">
          <label className='form-label'>Community:</label>
          <select value={community} className="form-control" onChange={(e) => setCommunity(e.target.value)}>
            <option value="">Select a community</option>
            {communities && communities.map(communite => (

              <option key={communite._id} value={communite._id}>
                {communite.name}
              </option>

            ))}
          </select>

          <label className='form-label'>Email</label>
          <input type="text" className="form-control" placeholder='Type in your email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
          <div className='my-3'>
            <button type='submit' className='btn btn-outline-danger container'>Remove user</button>
            {userError && <div className='alert alert-danger mt-3'>{userError}</div>}
            {userSuccess && <div className='success alert-success mt-3'>{userSuccess}</div>}
          </div>
        </div>




      </form>
    </div>
  )
}

export default RemoveUserFromCommunity