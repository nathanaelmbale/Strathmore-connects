import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePostContext } from "../hooks/usePostsContext"
import { useCommentContext } from "../hooks/useCommentContext";
import Communities from "./Communities";

function PostDetails() {
    const { dispatch } = usePostContext()
    const { comments, dispatchComments } = useCommentContext()
    const { postId } = useParams()
    const { user } = useAuthContext()
    const [post, setPost] = useState(null)
    const [comment, setComment] = useState(null)
    const [creator, setCreator] = useState("")




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
            await response.json();
            //console.log('Notification sent:', json);
        } catch (error) {
            console.error(error);
        }

    }

    const makeAComment = async (e) => {
        e.preventDefault()

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
            console.log("comment created", {})
            setComment("")

            //console.log("commentsss", json)//--the creators notification
            dispatchComments({ type: 'SET_COMMENTS', payload: json })

            if (json && user.email !== post.email) {
                notifyUser()
            }

        } catch (error) {
            console.log(error);
        }
    }


    const deleteComment = async (commentId) => {
        const obj = {
            postId: post._id,
            commentId: commentId
        }
        try {
            const response = await fetch('/post/uncomment', {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(obj)
            })
            const json = await response.json()
            console.log(json)
            dispatchComments({ type: 'SET_COMMENTS', payload: json.comment })

            //delete the comment from the user notification
            if (json.message === "Comment deleted successfully") {
                console.log("email", post)
                try {
                    const request = {
                        email: post.email,
                        notificationId: postId
                    }

                    const response = await fetch('/user/notification/delete', {
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${user.token}`
                        },
                        body: JSON.stringify(request)
                    })
                    await response.json()
                    //("deleted notification", json)
                } catch (error) {
                    console.log(error);
                }
            }

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        //fetch posts
        const fetchPosts = async () => {
            const response = await fetch('/post', {
                headers: { 'Authorization': `Bearer ${user.token}` },
            })
            const json = await response.json()
            //console.log(JSON.stringify(json)) --the posts

            if (response.ok) {
                dispatch({ type: 'SET_POSTS', payload: json })
                //find the post on which the route you are in currently is
                const currentPost = await json.find(post => post._id === postId)
                setPost(currentPost)
                //setComments(currentPost.comments)
                dispatchComments({ type: 'SET_COMMENTS', payload: currentPost.comments })
                setCreator(currentPost.user_id)
                //console.log("comments", currentPost.comments)
                //console.log("creator", creator)
            }
        }

        if (user) {
            fetchPosts()
        }

    }, [dispatch, dispatchComments, user, postId])

    return (
        <>
            <div className="grid 2xl:grid-cols-12 xl:grid-cols-12 lg:grid-span-12 w-full">
                <div className="2xl:col-span-9 xl:col-span-9 lg:col-span-9 w-full">
                    <div className=" md:w-9/12  lg:w-9/12 xl:w-9/12 2xl:w-9/12 mx-auto  my-10 w-full">
                        {post && (
                            <div className="bg-white shadow-sm rounded-b-lg w-full m-0 ">
                                <div key={post._id} className=''>
                                    {post && post.imagePath && (
                                        <img
                                            src={post.imagePath}
                                            className='rounded-t-lg'
                                            alt={post.description}
                                        />
                                    )}

                                    <div className="p-5 ">
                                        <h4 className='card-title'>{post.title}</h4>
                                        <p className='card-text'>{post.description}</p>
                                        <small className="bg-gray-200 py-0.5 px-1 rounded-lg">{post.category}</small>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="m-2"></div>
                        <p id="emailHelp" className="">
                            Make a comment
                        </p>

                        <form className="bg-white rounded-xl" onSubmit={makeAComment}>
                            <input type="text" className="w-11/12 bg-gray-100 ml-5" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="make a comment"></input>
                            <br></br>
                            <input type="submit" className="btn btn-primary my-2" name="comment" placeholder="comment" value="comment" ></input>
                        </form>

                        {comments && comments.map(comm => (
                            <div key={comm._id} className="comment">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>{comm.comment}</div>
                                    <button className="btn btn-outline-danger" onClick={() => deleteComment(comm._id)}>Delete</button>
                                </div>
                                <small className="">Post made by {comm.user}</small>
                            </div>
                        ))}

                    </div>
                </div>
                <div className="col-span-3 border-l-2">
                    <Communities />
                </div>
            </div>
        </>
    )
}

export default PostDetails
