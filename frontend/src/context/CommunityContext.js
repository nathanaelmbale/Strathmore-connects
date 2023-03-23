import { createContext, useReducer } from "react"

export const CommunityContext = createContext()

//dispatchCommunity({type: 'SET_POSTS', payload: [{}]})

export const CommunityReducer = (state, action) => {
    switch (action.type) {
        case "SET_COMMUNITIES":
            console.log("community payload:", action.payload)
            return {
                communities: action.payload
            }

        case "SET_JOINED_COMMUNITIES":
            console.log("communities joined:", action.payload)
            return {
                joinedCommunities: action.payload
            }

        case "SET_NOT_JOINED_COMMUNITIES":
            console.log("communities not joined:", action.payload)
            return {
                joinedNotommunities: action.payload
            }

        case "CREATE_COMMUNITY":
            return {
                communities: [action.payload, ...state.communities],
            }
        case "DELETE_COMMUNITY":
            return {
                communities: state.communities.filter(
                    (community) => community._id !== action.payload._id
                ),
            }

        default:
            return state
    }

}

export const CommunityContextProvider = ({ children }) => {
    //console.log("Child:", children)
    const [state, dispatchCommunity] = useReducer(CommunityReducer, {//func name,this is the current state and action is what is passed in the dispacth property
        communities: null
    })



    return (
        <CommunityContext.Provider value={{ ...state, dispatchCommunity }}>
            {children}
        </CommunityContext.Provider>
    )
}