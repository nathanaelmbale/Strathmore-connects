import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePostContext } from "../hooks/usePostsContext"

function PostDetails() {
    const { dispatch } = usePostContext()
    const { postId } = useParams()
    const { user } = useAuthContext()
    const [post, setPost] = useState(null)
    const [comment, setComment] = useState(null)
    const [comments, setComments] = useState(null)
    const [creator, setCreator] = useState("")

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/post', {
                headers: { 'Authorization': `Bearer ${user.token}` },
            })
            const json = await response.json()
            //console.log(JSON.stringify(json)) --the posts

            if (response.ok) {
                dispatch({ type: 'SET_POSTS', payload: json })
                const currentPost = await json.find(post => post._id === postId)
                setPost(currentPost)
                setComments(currentPost.comments)
                setCreator(currentPost.user_id)
                //console.log("comments", currentPost.comments)
                //console.log("creator", creator)
            }
        }


        if (user) {
            fetchPosts()
        }

    }, [dispatch, user, postId, creator])

    const notifyUser = async () => {

        const notificationId = post._id//post id
        const _id = creator //user id
        const title = "new comment on post"
        const description = comment
        //console.log("tupo site" ,notificationId ,_id ,creator ,description) -the object works
        const body = {
            _id,//user id
            notificationId,//post id
            title,
            description
        }

        //post the notification to the user
        try {
            const response = await fetch('/user/notification/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(body)
            });
            const json = await response.json();
            console.log('Notification sent:', json);
        } catch (error) {
            console.error(error);
        }

    }
    const makeAComment = async (e) => {
        e.preventDefault()
        console.log("event", post)
        const obj = {
            _id: post._id,
            comment: comment,
            user: user.email
        }
        try {
            const response = await fetch('/post/comment', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(obj)
            })
            const json = await response.json();
            //console.log("commentsss", json)--the creators notification
            if (json) {
                notifyUser()
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="container">
                <h1>Posts</h1>
                {post && (
                    <div key={post._id} className='card-body'>
                        {post && post.imagePath && (
                            <img
                                src={require(`../uploads/${post.imagePath}`)}
                                className='card-img-top'
                                style={{ "width": "38rem" }}
                                alt={post.description}
                            />
                        )}

                        <h4 className='card-title'>{post.title}</h4>
                        <p className='card-text'>{post.description}</p>
                        <small className="form-text text-muted">{post.category}</small>
                    </div>
                )}


                <form className="container" onSubmit={makeAComment}>
                    <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="make a comment"></input>
                    <input type="submit"></input>
                </form>

                {comments && comments.map(comm => (
                    <>
                        <div key={comm._id}>
                            <div>{comm.comment}</div>
                            <small className="form-text text-muted">Post made by {comm.user}</small>
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}

export default PostDetails
