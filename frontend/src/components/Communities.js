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
        const setcommunities = async () => {
            if (communities && communities.length > 0) {
                const joined = communities.filter(community => community.accounts.includes(user.email))
                setJoinedCommunities(joined)
                //console.log("joined", joined)
                dispatchCommunity({ type: 'SET_JOINED_COMMUNITIES', payload: joined })

                const notJoined = communities.filter(community => !community.accounts.includes(user.email))
                setNotJoinedCommunities(notJoined)
                //console.log("not joined", notJoined)
                dispatchCommunity({ type: 'SET_NOT_JOINED_COMMUNITIES', payload: joined })

            }
        }
        setcommunities()
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
                <div className='bg-white'>
                    <h3 className='border-b-2 text-3xl py-2 pl-3 my-2'>Communities</h3>
                    {joinedCommunities &&
                        <>
                            {notJoinedCommunities.map(community => (
                                <div className='conatiner border-b-2 pl-3 py-2 ' key={community._id}>
                                    <div className='flex'>
                                    <Link
                                        className='link flex-1'
                                        to={`/community/${community._id}`}>
                                        <h4 className='clickable-title'>{community.name}</h4>
                                    </Link>
                                    {user.admin &&
                                        <div className=''>
                                            <button onClick={() => deleteCommunity(community)} 
                                            className="bg-red-200 p-1.5 mr-4 rounded-full w-8 h-8"
                                            >
                                                
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M14.7404 9L14.3942 18M9.60577 18L9.25962 9M19.2276 5.79057C19.5696 5.84221 19.9104 5.89747 20.25 5.95629M19.2276 5.79057L18.1598 19.6726C18.0696 20.8448 17.0921 21.75 15.9164 21.75H8.08357C6.90786 21.75 5.93037 20.8448 5.8402 19.6726L4.77235 5.79057M19.2276 5.79057C18.0812 5.61744 16.9215 5.48485 15.75 5.39432M3.75 5.95629C4.08957 5.89747 4.43037 5.84221 4.77235 5.79057M4.77235 5.79057C5.91878 5.61744 7.07849 5.48485 8.25 5.39432M15.75 5.39432V4.47819C15.75 3.29882 14.8393 2.31423 13.6606 2.27652C13.1092 2.25889 12.5556 2.25 12 2.25C11.4444 2.25 10.8908 2.25889 10.3394 2.27652C9.16065 2.31423 8.25 3.29882 8.25 4.47819V5.39432M15.75 5.39432C14.5126 5.2987 13.262 5.25 12 5.25C10.738 5.25 9.48744 5.2987 8.25 5.39432" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </button>
                                        </div>
                                    }
                                    </div>
                                    <p className='text-desc'>{community.description}</p>
                                    <small>Created on: {new Date(community.createdAt).toLocaleDateString('en-GB')}</small>
                                    <div className='my-2'>
                                        <button onClick={() => joinedCommunity(community)}
                                            className="inline-flex items-center mt-2 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Join<svg aria-hidden="true"
                                                className="w-4 h-4 ml-2 -mr-1"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg">

                                                <path
                                                    fillRule="evenodd"
                                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                            </svg>
                                        </button>
                                    </div>
   
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