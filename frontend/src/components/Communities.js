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
    let loading = false


    useEffect(() => {
        const fetchCommunity = async () => {
            const response = await fetch('/community')

            const json = await response.json()

            if (response.ok) {
                dispatchCommunity({ type: 'SET_COMMUNITIES', payload: json })
            }
        }

        fetchCommunity()

        console.log("effect")
    }, [dispatchCommunity])

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
        console.log(loading)

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
                manageState()

            }).catch((error) => {
                console.log(error.message)
            })
        loading = false

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
                //console.log('Success:', data)
                if (!data.error) dispatchCommunity({ type: "SET_COMMUNITIES", payload: data })
                manageState()
                console.log(data.error)

            }).catch((error) => {
                console.log(error.message)
            })
    }

    const manageState = async () => {
        const fetchCommunity = async () => {
            const response = await fetch('/community')

            const json = await response.json()

            if (response.ok) {
                dispatchCommunity({ type: 'SET_COMMUNITIES', payload: json })
            }
        }

        await fetchCommunity()

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

        await setcommunities()
    }
    return (
        <>

            <div className='bg-white mt-4'>
                <h3 className='border-b-2 text-3xl py-2 pl-3 '>Communities</h3>
                {user ?
                    <>
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
                                            {user && user.admin &&
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
                                            {!loading ?
                                                <button onClick={() => {
                                                    loading = true
                                                    joinedCommunity(community)
                                                }}
                                                    className="inline-flex items-center mt-2 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                    Join
                                                    <svg aria-hidden="true"
                                                        className="w-4 h-4 ml-2 -mr-1"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg">


                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                                    </svg>
                                                </button>
                                                :
                                                <button disabled
                                                    className="inline-flex items-center mt-2 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                    <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                    </svg>
                                                    Loading...
                                                </button>
                                            }
                                        </div>

                                    </div>
                                ))}

                                <h3 className='border-b-2 text-3xl py-2 pl-3 my-2'>Communities joined</h3>

                                {joinedCommunities.map(community => (
                                    <div className='conatiner border-b-2 pl-3 py-2' key={community._id}>
                                        <div className='flex'>
                                            <Link
                                                className='link flex-1 m-0 p-0'
                                                to={`/community/${community._id}`}
                                            >
                                                <h4 className='clickable-title'>{community.name}</h4>
                                            </Link>

                                            {user && user.admin &&
                                                <div className='my-2'>
                                                    <button onClick={() => deleteCommunity(community)}
                                                        className="bg-red-200 p-1 mr-4 rounded-full w-8 h-8"
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
                                        <div className='community-description'>
                                            <p className='text-desc'>{community.description}</p>
                                            <small className='text-right font-bold'>Created on: {new Date(community.createdAt).toLocaleDateString('en-GB')}</small>
                                        </div>


                                    </div>
                                ))}
                            </>
                        }
                    </> :
                    <>
                        <div className='w-11/12 mx-auto flex bg-red-200 border-2 border-red-300 py-1.5 px-1.5 text-red-900 rounded-xl m-2'>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="red" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.9998 9.00006V12.7501M2.69653 16.1257C1.83114 17.6257 2.91371 19.5001 4.64544 19.5001H19.3541C21.0858 19.5001 22.1684 17.6257 21.303 16.1257L13.9487 3.37819C13.0828 1.87736 10.9167 1.87736 10.0509 3.37819L2.69653 16.1257ZM11.9998 15.7501H12.0073V15.7576H11.9998V15.7501Z" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <p className='flex-1 mx-2 text-sm'>You need an account join a community</p>

                        </div>
                        <div className=' border-b-2 mt-2' />
                        {communities && communities.map(community => (
                            <div className='conatiner border-b-2 pl-3 py-2 ' key={community._id}>
                                <div className='flex'>
                                    <Link
                                        className='link flex-1'
                                        to={`/community/${community._id}`}>
                                        <h4 className='clickable-title'>{community.name}</h4>
                                    </Link>
                                </div>
                                <p className='text-desc'>{community.description}</p>
                                <small>Created on: {new Date(community.createdAt).toLocaleDateString('en-GB')}</small>
                                <div className='my-2'>
                                    <button disabled={user} onClick={() => joinedCommunity(community)
                                    }
                                        className="inline-flex items-center mt-2 px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-500  focus:outline-none">
                                        Join<svg aria-hidden="true"
                                            className="w-4 h-4 ml-2 -mr-1"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">

                                            <path
                                                fillRule="evenodd"
                                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                        </svg>
                                    </button>
                                </div>

                            </div>
                        ))}
                    </>
                }
            </div>
        </>
    )
}

export default Communities