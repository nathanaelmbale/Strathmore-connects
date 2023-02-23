import { CommunityContext } from "../context/CommunityContext";
import { useContext } from "react";

export const useCommunityContext = () =>{
    const context = useContext(CommunityContext)

    if(!context) {
        throw Error('useWorkout context must be used in the root tree of App.js')
    }

    return context
}