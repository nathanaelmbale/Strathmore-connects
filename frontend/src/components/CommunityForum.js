import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { usePostContext } from '../hooks/usePostsContext'
import { useParams, Link } from 'react-router-dom'
import { useCommunityContext } from '../hooks/useCommunityContext'
import CommunityPost from './CommunityPost'


//allow user to post -comment
//start handling errors



const CommunityForum = () => {
    const { communityId } = useParams()
    const { user } = useAuthContext()
    const { posts, dispatch } = usePostContext()
    const {  dispatchCommunity } = useCommunityContext()

    const [communities, setCommunities] = useState([])
    const [communityPosts, setCommunityPosts] = useState([])
    const [isUserInCommunity, setIsUserInCommunity] = useState(false)
    const [makePost, setMakePost] = useState(false)
    const [currentCommunity, setCurrentCommunity] = useState({})



    useEffect(() => {


        const fetchPosts = async () => {
            const response = await fetch('http://localhost:5000/post')
            const json = await response.json()

            setCommunityPosts(json)
            const available = json && json.filter(post => post.community?.includes(communityId))
            setCommunityPosts(available)

            if (response.ok) {
                dispatch({ type: 'SET_POSTS', payload: json })

            }
        }

        const fetchCommunity = async () => {
            const response = await fetch('http://localhost:5000/community')
            const commune = await response.json()
            setCommunities(commune)

            const communityee = commune && commune.find(c => c._id === communityId)
            setCurrentCommunity(communityee)
            if (response.ok) {
                dispatchCommunity({ type: 'SET_COMMUNITIES', payload: commune })
            }
        }
        if (posts) {
            const available = posts && posts.filter(post => post.community?.includes(communityId))
            setCommunityPosts(available)
            //console.log("community post", communityPosts)

        }

        //check communityId if it exists in communities._id

        fetchPosts()
        fetchCommunity()

    }, [communityId,dispatch,posts ,dispatchCommunity ,user])



    useEffect(() => {
        console.log("new community ")
        const communityMember = async () => {
            console.log(communityId)
            console.log("communities",communities)
            const community = communities && communities.find(c => c._id === communityId)
            console.log("current",community)
            const comm = community && community.accounts.includes(user.email)
            setIsUserInCommunity(community && community.accounts.includes(user.email))
            console.log("bool",comm,isUserInCommunity)

            if (comm === true) {
                setIsUserInCommunity(true)
            }
        }

        communityMember()
        const manageState = () => {
            const fetchPosts = async () => {
                const response = await fetch('http://localhost:5000/post', {
                    headers: { 'Authorization': `Bearer ${user.token}` },
                })
                const json = await response.json()

                //Sets the posts where the communityId marches the url
                const available = json && json.filter(post => post.community?.includes(communityId))
                setCommunityPosts(available)
            }


            if (user) {
                fetchPosts()
            }

        }

        manageState()

    }, [communityId,dispatch,communities,user ,isUserInCommunity])


    const deletePost = async (post) => {

        fetch('http://localhost:5000/post/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({_id : post._id})
        })
            .then(response => response.json())
            .then(data => {
                console.log("deleted", data.posts)
                dispatch({ type: "DELETE_POST", payload: data.posts })
                if (data.message === "post was deleted") deleteNotification(data.posts._id)

            }).catch((error) => {
                console.log(error.message)
            })


        const deleteNotification = async (notification) => {
            const notify = {
                email: user.email,
                notificationId: notification
            }
            console.log(notify)

            fetch('user/notification/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(notify)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);

                }).catch((error) => {
                    console.log(error.message)
                })
        }
    }

    return (
        <>

            <div className='' id='welcome'>
                <div className=''>
                    <div className='shadow-sm border my-5 m-2 md:m-6 rounded-lg '>
                        <h1 className='text-3xl my-3 font-bold ml-5'>{currentCommunity && currentCommunity.name}</h1>
                        <p className='ml-5 my-2'>{currentCommunity && currentCommunity.description}</p>
                    </div>

                    {isUserInCommunity ?
                        <button
                            className="my-0 ml-6 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg
                         hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={() => setMakePost(!makePost)} >Create Post</button>
                        : <div className='ml-5 flex bg-red-200 border-2 border-red-300 py-3 px-1.5 text-red-900 rounded-xl'>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="red" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.9998 9.00006V12.7501M2.69653 16.1257C1.83114 17.6257 2.91371 19.5001 4.64544 19.5001H19.3541C21.0858 19.5001 22.1684 17.6257 21.303 16.1257L13.9487 3.37819C13.0828 1.87736 10.9167 1.87736 10.0509 3.37819L2.69653 16.1257ZM11.9998 15.7501H12.0073V15.7576H11.9998V15.7501Z" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <p className='flex-1 mx-2'>You should be part of the community to make a post on a community</p>

                        </div>}
                    {makePost ?
                        <CommunityPost ></CommunityPost> :
                        null}
                    {communityPosts && communityPosts.map(post => (
                        <div className='shadow-sm border my-5 ml-5  md:m-6 rounded-lg' key={post._id}>
                            {post.imagePath && (
                                <img
                                    src={post.imagePath}
                                    className='rounded-t-lg'
                                    style={{ "width": "100%" }}
                                    alt={post.description}
                                />
                            )}

                            <div className='m-5 '>
                                <div className='flex'>
                                <h4 className='flex-1 font-light text-lg'>{post.title}</h4>
                                {user && user.admin === true ?
                                    <button 
                                    className='bg-red-200 p-1.5 mr-2 rounded-full w-8 h-8' 
                                    onClick={() => deletePost(post)}>
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
                                    : null}
                                    </div>
                                <p className=''>{post.description}</p>
                                <p className=' text-xs text-gray-600'>Posted by {post.email}</p>
                                
                                    <Link
                                        className="inline-flex items-center mt-2 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        to={`/posts/${post._id}`}>
                                            {post === "post" ?<>view post</>: <>Comment</>}
                                         
                                        <svg aria-hidden="true"
                                            className="w-4 h-4 ml-2 -mr-1"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg">

                                            <path
                                                fillRule="evenodd"
                                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                        </svg>
                                    </Link>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default CommunityForum