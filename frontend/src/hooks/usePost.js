import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { usePostContext } from './usePostsContext'

export const usePost = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = usePostContext()
    const { user } = useAuthContext()
    console.log("user ", user)


    if (!user) {
        // handle error if user is not logged in
        setError('User not logged in')
        console.log("fail")
        setIsLoading(false)
        return
    }

    const fetchPosts = async () => {
        setIsLoading(true)
        const response = await fetch('https://strathmoreconnects-backend.onrender.com/post', {
          headers: { 'Authorization': `Bearer ${user.token}` },
        })
        const json = await response.json()
        console.log("json:" + JSON.stringify(json))
        //test = JSON.stringify(json)
  
        if (response.ok) {
          dispatch({ type: 'SET_POSTS', payload: json })
        }

      }
    return { fetchPosts, isLoading }
}