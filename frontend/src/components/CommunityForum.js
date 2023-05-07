import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { usePostContext } from '../hooks/usePostsContext'
import { useParams, Link } from 'react-router-dom'
import { useCommunityContext } from '../hooks/useCommunityContext'
import CommunityPost from './CommunityPost'
import Communities from './Communities'
import Posts from './Posts'

//allow user to post -comment
//start handling errors



const CommunityForum = () => {
    const { communityId } = useParams()
    const { user } = useAuthContext()
    const { posts, dispatch } = usePostContext()
    const { communities, dispatchCommunity } = useCommunityContext()

    const [communityPosts, setCommunityPosts] = useState([])
    const [isUserInCommunity, setIsUserInCommunity] = useState(false)
    const [makePost, setMakePost] = useState(false)
    const [currentCommunity, setCurrentCommunity] = useState({})



    useEffect(() => {
        console.log("me ")

        const fetchPosts = async () => {
            const response = await fetch('/post', {
                headers: { 'Authorization': `Bearer ${user.token}` },
            })
            const json = await response.json()

            setCommunityPosts(json)
            const available = json && json.filter(post => post.community?.includes(communityId))
            setCommunityPosts(available)

            if (response.ok) {
                dispatch({ type: 'SET_POSTS', payload: json })

            }
        }

        const fetchCommunity = async () => {
            const response = await fetch('/community', {
                headers: { 'Authorization': `Bearer ${user.token}` },
            })
            const commune = await response.json()
            //console.log("json:" + JSON.stringify(json))

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

    }, [communityId])



    useEffect(() => {
        console.log("new community ")
        const communityMember = async () => {
            console.log(communityId)
            const community = await communities && communities.find(c => c._id === communityId)
            console.log("current",community)
            const comm = await community && community.accounts.includes(user._id)
            console.log("bool",comm)

            if (comm === true) {
                setIsUserInCommunity(true)
            }
        }

        communityMember()
        const manageState = () => {
            const fetchPosts = async () => {
                const response = await fetch('/post', {
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

    }, [communityId])


    const deletePost = async (post) => {
        const postDelete = {
            _id: post._id
        }

        fetch('post/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(postDelete)
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
                            <p className='flex-1 mx-2'>You should be part of the community to make a post or comment</p>

                        </div>}
                    {makePost ?
                        <CommunityPost ></CommunityPost> :
                        null}
                    {communityPosts && communityPosts.map(post => (
                        <div className='shadow-sm border my-5  md:m-6 rounded-lg' key={post._id}>
                            {post.imagePath && (
                                <img
                                    src={post.imagePath}
                                    className='rounded-t-lg'
                                    style={{ "width": "100%" }}
                                    alt={post.description}
                                />
                            )}

                            <div className='m-5'>
                                <h4 className=' font-light text-lg'>{post.title}</h4>
                                <p className='card-text'>{post.description}</p>
                                <p className=' text-xs text-gray-600'>Posted by {post.email}</p>
                                {post.category === "post" ?
                                    <Link
                                        className="inline-flex items-center mt-2 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        to={`/posts/${post._id}`}>
                                        view post
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
                                    : null}
                                {user.admin === true ?
                                    <button className='btn btn-danger container my-2' onClick={() => deletePost(post)}>delete</button>
                                    : null}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default CommunityForum