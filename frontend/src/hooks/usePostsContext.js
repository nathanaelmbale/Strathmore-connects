import { PostsContext } from "../context/PostContext";
import { useContext } from "react";

export const usePostContext = () =>{
    const context = useContext(PostsContext)

    if(!context) {
        throw Error('useWorkout context must be used in the root tree of App.js')
    }

    return context
}