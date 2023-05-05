import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCommunityContext } from '../hooks/useCommunityContext'
import '../styles/community.css'
import { Link } from 'react-router-dom'


const Communities = () => {
    const { user } = useAuthContext()
    const { communities, dispatchCommunity } = useCommunityContext()

    const [joinedCommunities, setJoinedCommunities] = useState([])
    const [notJoinedCommunities, setNotJoinedCommunities] = useState([])


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


        if (user) {
            fetchCommunity()
        }
        console.log("effect")
    }, [dispatchCommunity, user])

    useEffect(() => {

        if (communities && communities.length > 0) {
            const joined = communities.filter(community => community.accounts.includes(user.email))
            setJoinedCommunities(joined)
            console.log(joined)
            dispatchCommunity({ type: 'SET_JOINED_COMMUNITIES', payload: joined })

            const notJoined = communities.filter(community => !community.accounts.includes(user.email))
            setNotJoinedCommunities(notJoined)
            dispatchCommunity({ type: 'SET_NOT_JOINED_COMMUNITIES', payload: joined })

        }
    }, [communities, user, dispatchCommunity])



    const joinedCommunity = async (community) => {
        //console.log(community)

        fetch('/community/join', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ communityId: community._id, email: user.email })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data)
                dispatchCommunity({ payload: 'SET_COMMUNITIES' })


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

        //console.log("dammm", userToCommunity)

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
                if (!data.error) dispatchCommunity({ type: "SET_COMMUNITIES", payload: data })
                console.log(data.error)

            }).catch((error) => {
                console.log(error.message)
            })
    }

    return (
        <>
            {user ?
                <div className=''>
                    <h3 className='border-b-2 text-3xl py-2 pl-3 my-2'>Communities</h3>
                    {joinedCommunities &&
                        <>
                            {notJoinedCommunities.map(community => (
                                <div className='conatiner border-b-2 pl-3 py-2 ' key={community._id}>

                                    <Link
                                        className='link'
                                        to={`/community/${community._id}`}>
                                        <h4 className='clickable-title'>{community.name}</h4>
                                    </Link>

                                    <p className='text-desc'>{community.description}</p>
                                    <small>Created on: {new Date(community.createdAt).toLocaleDateString('en-GB')}</small>
                                    <div className='my-2'>

                                        <button onClick={() => joinedCommunity(community)}
                                            className="inline-flex items-center mt-2 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Join</button>
                                    </div>
                                    {user.admin &&
                                        <div className='my-2'>
                                            <button onClick={() => deleteCommunity(community)} className="btn btn-danger ">Delete</button>
                                        </div>
                                    }
                                </div>
                            ))}

                            <h3 className='border-b-2 text-3xl py-2 pl-3 my-2'>Communities joined</h3>

                            {joinedCommunities.map(community => (
                                <div className='conatiner border-b-2 pl-3 py-2' key={community._id}>
                                    <Link
                                        className='link'
                                        to={`/community/${community._id}`}
                                    >
                                        <h4 className='clickable-title'>{community.name}</h4>
                                    </Link>

                                    <div className='community-description'>
                                        <p className='text-desc'>{community.description}</p>
                                        <small className='text-right font-bold'>Created on: {new Date(community.createdAt).toLocaleDateString('en-GB')}</small>
                                    </div>

                                    {user.admin &&
                                        <div className='my-2'>
                                            <button onClick={() => deleteCommunity(community)} className="btn btn-danger ">Delete</button>
                                        </div>
                                    }
                                </div>
                            ))}
                        </>
                    }
                </div>
                : <h5>You need an account to see the communities you are part of</h5>}
        </>
    )
}

export default Communities