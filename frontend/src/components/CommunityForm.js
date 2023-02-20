import React, { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

const CommunityForm = () => {
    const [description, setDescription] = useState()
    const [name, setName] = useState()
    const { user } = useAuthContext()
    const community = {name , description}
    
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
                
            }).catch((error) => {
                console.log(error.message)
            })
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Community name
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    Description:
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <button type="submit" className='btn btn-outline-primary'>Submit</button>
            </form>
        </>
    )
}

export default CommunityForm