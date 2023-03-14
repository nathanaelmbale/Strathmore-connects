import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCommunityContext } from '../hooks/useCommunityContext'
//import { Link } from 'react-router-dom'
import '../styles/community.css'


const Communities = () => {
    const { user } = useAuthContext()
    const { communities, dispatch } = useCommunityContext()

    const [joinedCommunities, setJoinedCommunities] = useState([])
    const [notJoinedCommunities, setNotJoinedCommunities] = useState([])
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
    }, [dispatch, user])

    useEffect(() => {
        if (communities && communities.length > 0) {
            const joined = communities.filter(community => community.accounts.includes(user._id))
            setJoinedCommunities(joined)
            const notJoined = communities.filter(community => !community.accounts.includes(user._id))
            setNotJoinedCommunities(notJoined)
        }
    }, [communities, user])

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
    console.log("joined", joinedCommunities)
    console.log("not joined", notJoinedCommunities)
    return (
        <>
            <h3 className='border-bottom py-4'>Communities</h3>
            {joinedCommunities &&
                <>
                    <h6>Not joined Communities</h6>
                    {notJoinedCommunities.map(community => (
                        <div className='conatiner border-bottom p-2' key={community._id}>
                            <div>
                                <h4>{community.name}</h4>
                                <p>{community.description}</p>
                                <button onClick={() => joinedCommunity(community)} className="btn btn-outline-primary">Join</button>
                                {user.admin &&
                                    <button onClick={() => deleteCommunity(community)} className="btn btn-danger ml-5">Delete</button>
                                }
                            </div>
                        </div>
                    ))}
                    <br></br>
                    <h6>Joined Communities</h6>
                    {joinedCommunities.map(community => (
                        <div className='conatiner border-bottom p-2' key={community._id}>
                            <h4>{community.name}</h4>
                            <div className='community-description'>{community.description}</div>
                                <button onClick={() => deleteCommunity(community)} className="btn btn-outline-danger">
                                    Leave

                                </button>
                        </div>
                    ))}
                </>
            }

        </>
    )
}

export default Communities