import React from 'react'
import { usePostContext } from '../hooks/usePostsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { Link } from 'react-router-dom'


const Posts = () => {
    const { user } = useAuthContext()
    const { posts ,dispatch } = usePostContext()

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
                dispatch({ type: "DELETE_POST", payload:  data.posts })
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
        <div className='container'>
            <h1>Posts</h1>
            {posts && posts.map(post => (
                <div className='card mt-2'  key={post._id}>
                    {post.imagePath && (
                        <img
                            src={require(`../uploads/${post.imagePath}`)}
                            className='card-img-top'
                            style={{ "width": "100%" }}
                            alt={post.description}
                        />
                    )}

                    <div className='card-body'>
                        <h4 className='card-title'>{post.title}</h4>
                        <p className='card-text'>{post.description}</p>
                        <Link className='btn btn-primary mr-4' to={`/posts/${post._id}`}>view post</Link>
                        {user.admin === true ? 
                        <button className='btn btn-danger' onClick={() => deletePost(post)}>delete</button>
                        : null }
                    </div>
                </div>
            ))}
            </div>
        </>
    )
}

export default Posts