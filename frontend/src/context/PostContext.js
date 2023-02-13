import { createContext, useReducer } from "react";

export const PostsContext = createContext()

export const postsReducer = (state, action) => {

    switch (action.type) {
        case 'SET_POSTS':
            return {
                //A sets multiple post so we don't have to refetch
                posts: action.payload
            }
            break;
        case 'CREATE_POST':
            return {
                //A single post ,with the previous workout state
                posts: [action.payload, ...state.posts]
            }
            break;
        default:
            return state;
    }
}

export const PostContextProvide = ({ children }) => {
    console.log("Children:",children)
    const [state, dispatch] = useReducer(postsReducer, {
        post: null
    })

    return (
        <PostsContext.Provider value={{ ...state ,dispatch }}>
            {children}
        </PostsContext.Provider>
    )
}