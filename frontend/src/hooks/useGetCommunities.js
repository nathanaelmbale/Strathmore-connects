import { useState } from 'react'
import { useCommunityContext } from './useCommunityContext'
import { useAuthContext } from './useAuthContext'


export const useGetCommunities = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { communities, dispatchCommunity } = useCommunityContext()
    const { user } = useAuthContext()

    const getCommunities = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('http://localhost:5000/community', {
                headers: { 'Authorization': `Bearer ${user.token}` },
            })
            const json = await response.json()

            if (!response.ok) {
                throw new Error(json.message)
            }

            dispatchCommunity({ type: 'SET_COMMUNITIES', payload: json })
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return { getCommunities, isLoading, error, communities }
}

