import { CommentContext } from "../context/CommentContext";
import { useContext } from "react";

export const useCommentContext = () =>{
    const context = useContext(CommentContext)

    if(!context) {
        throw Error('useWorkout context must be used in the root tree of App.js')
    }

    return context
}