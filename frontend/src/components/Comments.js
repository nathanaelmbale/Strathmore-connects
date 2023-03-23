import React, { useEffect } from 'react'
import { useCommentContext } from "../hooks/useCommentContext"


const Comments = ({ commentss ,deleteComment}) => {
    const { comments , dispatch } = useCommentContext()

    useEffect(() => {
        dispatch({ type: 'SET_COMMENTS', payload: comments})
    },[dispatch])
    return (
        <div>
            {comments && comments.map(comm => (
                <div key={comm._id} className="comment">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>{comm.comment}</div>
                        <button className="btn btn-outline-danger" onClick={() => deleteComment(comm._id)}>Delete</button>
                    </div>
                    <small className="form-text text-muted">Post made by {comm.user}</small>
                </div>
            ))}
        </div>
    )
}

export default Comments