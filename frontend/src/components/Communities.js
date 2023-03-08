import React, { useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCommunityContext } from '../hooks/useCommunityContext'

const Communities = () => {
    const { user } = useAuthContext()
    const { communities, dispatch } = useCommunityContext()

    //console.log('user', user)
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/community', {
                headers: { 'Authorization': `Bearer ${user.token}` },
            })
            const json = await response.json()
            //console.log("json:" + JSON.stringify(json))
            //test = JSON.stringify(json)

            if (response.ok) {
                dispatch({ type: 'SET_COMMUNITIES', payload: json })
            }
        }

        if (user) {
            fetchPosts()
        }
    }, [dispatch, user ])

    const joinedCommunity = async (community) => {

        const userToCommunity = {
            id: community._id,
            name: community.name,
            description: community.description
        }
        console.log("dammm", userToCommunity)

        fetch('/community', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(userToCommunity)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);

            }).catch((error) => {
                console.log(error.message)
            })

    }

    const deleteCommunity = async (community) => {
        const userToCommunity = {
            id: community._id,
            name: community.name,
            description: community.description
        }

        console.log("dammm", userToCommunity)

        fetch('/community/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(userToCommunity)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data)
                dispatch({ type: "DELETE_COMMUNITY", payload: data })

            }).catch((error) => {
                console.log(error.message)
            })
    }

    return (
        <>
            <h3>Communities</h3>
            {communities && communities.map(community => (
                <>
                    <div key={community._id}>
                        <h4>{community.name}</h4>
                        <p>{community.description}</p>
                        <button onClick={() => joinedCommunity(community)} className="btn btn-primary">Join</button>
                        {user.admin  ? 
                        <button onClick={() => deleteCommunity(community)} className="btn btn-danger ml-5">Delete</button>
                        :null
                        }
                    </div>
                </>
            ))}
        </>
    )
}

export default Communities