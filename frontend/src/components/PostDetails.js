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
            <div className="grid grid-cols-1 2xl:grid-cols-12 xl:grid-cols-12 lg:grid-span-12 w-full">
                <div className="2xl:col-span-9 xl:col-span-9 lg:col-span-9   w-11/12">
                    <div className=" md:w-9/12  lg:w-9/12 xl:w-9/12 2xl:w-9/12 mx-auto md:mx-auto sm:mx-5 my-10 w-full">
                        {post && (
                            <div className="bg-white shadow-sm w-full rounded-b-lg ml-4 ">
                                <div key={post._id} className=''>
                                    {post && post.imagePath && (
                                        <img
                                            src={post.imagePath}
                                            className='rounded-t-lg'
                                            alt={post.description}
                                        />
                                    )}

                                    <div className="">
                                        <h4 className=''>{post.title}</h4>
                                        <p className=''>{post.description}</p>
                                        <small className="bg-gray-200 py-0.5 px-1 rounded-lg">{post.category}</small>
                                    </div>
                                </div>
                            </div>
                        )}

                        <form className="bg-white rounded-2xl my-3 shadow-sm w-full ml-4" onSubmit={makeAComment}>
                            <div className="py-4">
                                <input
                                    type="text"
                                    className="w-11/12 bg-gray-200 ml-5 rounded-2xl p-1.5 focus:ring-blue-300"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="comment here"></input>
                                <br></br>
                                <input type="submit"
                                    className="inline-flex items-center mt-2 ml-5 px-3 py-2 text-sm font-medium 
                                    text-center text-white bg-blue-700 rounded-2xl hover:bg-blue-800
                                     focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600
                                      dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    name="comment" placeholder="comment" value="comment" ></input>
                            </div>
                        </form>

                        {comments && comments.map(comm => (
                            <div key={comm._id} className="bg-white rounded-2xl my-3 shadow-sm w-full py-4 ml-4">
                                <div className="d-flex justify-content-between align-items-center ml-5 flex">
                                    <div className="flex-1">{comm.comment}</div>
                                    <button className="bg-red-200 p-1.5 mr-2 rounded-full" onClick={() => deleteComment(comm._id)}>
                                        
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
                                <small className="ml-5 text-gray-400">Post made by {comm.user}</small>
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
