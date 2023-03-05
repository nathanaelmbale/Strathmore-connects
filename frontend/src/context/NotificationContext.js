import { createContext, useReducer } from "react";

export const NotificationsContext = createContext()

//dispatch({type: 'SET_NOTIFICATIONSs', payload: [{}]})

export const NotificationReducer =(state, action) =>{
        switch (action.type) {
            case 'SET_NOTIFICATIONS':
                console.log("payload:",action.payload)
                return {
                    notifications: action.payload
                }
            case 'CREATE_NOTIFICATION':
                return {
                    //returns one notification ...spreads the state
                    notifications: [ action.payload, ...state.notifications]
                }
            
                case 'DELETE_NOTIFICATION':
                    return {
                        notifications: state.notifications.filter((notification) => notification._id !== action.payload._id)
                    }
            default:
                return state
        }
}

export const NotificationsContextProvider = ({ children }) => {
    console.log("Child:",children)
    const [state, dispatch] = useReducer(NotificationReducer , {//func name,this is the current state and action is what is passed in the dispacth property
        notifications : null
    })

    

    return (
        <NotificationsContext.Provider value={{...state , dispatch}}>
            { children }
        </NotificationsContext.Provider>
    )
}