import { createContext, useReducer } from "react"

export const CommentContext = createContext()

//dispatchComments({type: 'SET_POSTS', payload: [{}]})

export const CommentReducer = (state, action) => {
    switch (action.type) {
        case "SET_COMMENTS":
            //console.log("comment payload:", action.payload)
            return {
                comments : action.payload,
            }


        default:
            return state
    }

}

export const CommentContextProvider = ({ children }) => {
    
    const [state, dispatchComments] = useReducer(CommentReducer, {//func name,this is the current state and action is what is passed in the dispacth property
        comments : null
    })



    return (
        <CommentContext.Provider value={{ ...state, dispatchComments }}>
            {children}
        </CommentContext.Provider>
    )
}