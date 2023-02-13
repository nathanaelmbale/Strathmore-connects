import { PostsContext } from "../context/PostContext";
import { useContext } from "react";

export const usePostsContext = () => {

    const stateAndDispatch = useContext(PostsContext)
    
    if(!stateAndDispatch) {
        throw Error('usePost context must be used in the root tree of App.js')
    }

    return stateAndDispatch
}