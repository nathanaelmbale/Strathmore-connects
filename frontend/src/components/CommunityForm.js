import React, { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCommunityContext } from '../hooks/useCommunityContext'

const CommunityForm = () => {
    const [description, setDescription] = useState()
    const [name, setName] = useState()
    //context
    const { user } = useAuthContext()
    const { dispatch } = useCommunityContext()

    const community = { name, description }

    const handleSubmit = async (e) => {
        e.preventDefault();

        fetch('/community', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(community)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setName("")
                setDescription("")
                dispatch({ type: "CREATE_COMMUNITY", payload: data })

            }).catch((error) => {
                console.log(error.message)
            })
    }
    return (
        <>
            {user && user.admin ?
                <form onSubmit={handleSubmit} className="container m-4">
                    <div className="form-group">
                        <label>Community name</label>
                        <input className="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)} />

                    </div>

                    <div className="form-group">
                        <label>Description:</label>
                        <input className="form-control" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <button type="submit" className='btn btn-outline-primary'>Submit</button>
                </form>
                : null}
        </>
    )
}

export default CommunityForm