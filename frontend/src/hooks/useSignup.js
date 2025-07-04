import { useState } from "react";
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [error , setError] = useState(null)
    const [isLoading , setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (name, email, password) => {
        setIsLoading(true)
        setError(null)
        console.log(JSON.stringify({name ,email ,password}))

        const response = await fetch('https://strathmoreconnects-backend.onrender.com/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name ,email ,password })
        }) 

        const json = await response.json()
        console.log(json)

        if(!response.ok) {
            setIsLoading(false)
            setError(json.message)
            console.log(error)
        }

        if(response.ok) {
            //save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update the auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }

    return { signup, isLoading, error}
}