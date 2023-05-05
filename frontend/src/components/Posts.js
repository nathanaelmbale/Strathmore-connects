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
                                <h3 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>{post.title}</h3>
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
                                {user.admin === true ?
                                    <button className='btn btn-danger' onClick={() => deletePost(post)}>delete</button>
                                    : null}
                            </div>
                        </div>
                    ))}
                </div> :
                <h5>You need an account to view the posts</h5>}
        </>
    )
}

export default Posts