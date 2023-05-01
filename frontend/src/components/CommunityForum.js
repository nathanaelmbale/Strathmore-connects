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
    const { communities, dispatchCommunity } = useCommunityContext()

    const [communityPosts, setCommunityPosts] = useState([])
    const [isUserInCommunity, setIsUserInCommunity] = useState(false)
    const [makePost, setMakePost] = useState(false)
    const [currentCommunity, setCurrentCommunity] = useState({})



    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('https://strathmoreconnects-backend.onrender.com/post', {
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
            const response = await fetch('https://strathmoreconnects-backend.onrender.com/community', {
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

        if (user) {
            fetchPosts()
            fetchCommunity()
        }

    }, [dispatch, user, dispatchCommunity, communityId, posts])



    useEffect(() => {
        const community = communities && communities.find(c => c._id === communityId)

        const comm = community && community.accounts.includes(user._id)

        if (comm === true) {
            setIsUserInCommunity(true)
        }

        const manageState = () => {
            const fetchPosts = async () => {
                const response = await fetch('https://strathmoreconnects-backend.onrender.com/post', {
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

    }, [communityId, communities, user])


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

            <div className='bg-white' id='welcome'>
                <div className=''>
                    <div className='card m-2'>
                        <h1 className='m-2'><center>{currentCommunity && currentCommunity.name} community</center></h1>
                        <p className='ml-4'>{currentCommunity && currentCommunity.description}</p>
                    </div>
                    <div id='posts' className='container w-100 '>
                        {isUserInCommunity ?
                            <button className='btn btn-outline-primary w-100' onClick={() => setMakePost(!makePost)} >Create Post</button>
                            : <div>You should be part of the community to make a post or comment</div>}
                        {makePost ?
                            <CommunityPost ></CommunityPost> :
                            null}
                        {communityPosts && communityPosts.map(post => (
                            <div className='card mt-2' key={post._id}>
                                {post.imagePath && (
                                    <img
                                        src={post.imagePath}
                                        className='card-img-top'
                                        style={{ "width": "100%" }}
                                        alt={post.description}
                                    />
                                )}

                                <div className='card-body'>
                                    <h4 className='card-title'>{post.title}</h4>
                                    <p className='card-text'>{post.description}</p>
                                    {post.category === "post" ?
                                        <Link className='btn btn-primary mr-4 container' to={`/posts/${post._id}`}>view post</Link>
                                        : null}
                                    {user.admin === true ?
                                        <button className='btn btn-danger container my-2' onClick={() => deletePost(post)}>delete</button>
                                        : null}
                                    <small>Posted by <b>{user.email}</b></small>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </>
    )
}

export default CommunityForum