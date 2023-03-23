import { createContext, useReducer } from "react";

export const PostsContext = createContext()

//dispatch({type: 'SET_POSTS', payload: [{}]})

export const PostReducer =(state, action) =>{
        switch (action.type) {
            case 'SET_POSTS':
                //console.log("payload:",action.payload)
                return {
                    posts: action.payload
                }
            case 'CREATE_POST':
                return {
                    //returns one post ...spreads the state
                    posts: [ action.payload, ...state.posts]
                    
                }
            
                case 'DELETE_POST':
                    return {
                        posts: state.posts.filter((post) => post._id !== action.payload._id)
                    }
            default:
                return state
        }
}

export const PostsContextProvider = ({ children }) => {
    //console.log("Child:",children)
    const [state, dispatch] = useReducer(PostReducer , {//func name,this is the current state and action is what is passed in the dispacth property
        posts : null
    })

    

    return (
        <PostsContext.Provider value={{...state , dispatch}}>
            { children }
        </PostsContext.Provider>
    )
}