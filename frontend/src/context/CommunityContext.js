import { createContext, useReducer } from "react";

export const CommunityContext = createContext()

//dispatch({type: 'SET_POSTS', payload: [{}]})

export const CommunityReducer =(state, action) =>{
        switch (action.type) {
            case 'SET_COMMUNITIES':
                console.log("payload:",action.payload)
                return {
                    communities: action.payload
                }
            case 'CREATE_COMMUNITy':
                return {
                    //returns one post ...spreads the state
                    communities: [ action.payload, ...state.communities]
                }
            
                case 'DELETE_COMMUNITY':
                    return {
                        communities: state.communities.filter((community) => community._id !== action.payload._id)
                    }
            default:
                return state
        }
}

export const CommunityContextProvider = ({ children }) => {
    console.log("Child:",children)
    const [state, dispatch] = useReducer(CommunityReducer , {//func name,this is the current state and action is what is passed in the dispacth property
        communities : null
    })

    

    return (
        <CommunityContext.Provider value={{...state , dispatch}}>
            { children }
        </CommunityContext.Provider>
    )
}