import React from 'react'
import { usePostContext } from '../hooks/usePostsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { Link } from 'react-router-dom'


const Posts = () => {
    const { user } = useAuthContext()
    const { posts, dispatch } = usePostContext()
    console.log(posts)
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
            {user ?
                <div className=' w-11/12 md:w-9/12  lg:w-9/12 xl:w-9/12 2xl:w-9/12 mx-auto '>
                    {posts && posts.filter(post => post.category === 'post').map(post => (

                        <div className='shadow-sm border my-5 m-2 md:m-6' key={post._id}>
                            {post.imagePath && (
                                <img
                                    src={post.imagePath}
                                    className='rounded-t-lg h-90'
                                    style={{ "width": "100%" }}
                                    alt={post.description}
                                />
                            )}
                            <div className='m-5'>
                                <div className='flex'>
                                <h3 className='flex-1 mb-2 text-2xl font-bold tracking-tight text-gray-900'>{post.title}</h3>
                                {user.admin === true ?
                                    <button onClick={() => deletePost(post)}
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
                                    : null}
                                    </div>
                                <p className='card-text'>{post.description}
                                    <br></br>
                                    <span className="badge badge-success">{post.category}</span>
                                </p>
                                <Link
                                    to={`/posts/${post._id}`}
                                    className="inline-flex items-center mt-2 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    View more
                                    <svg aria-hidden="true"
                                        className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </Link>

                            </div>
                        </div>
                    ))}
                </div> :
                <h5>You need an account to view the posts</h5>}
        </>
    )
}

export default Posts