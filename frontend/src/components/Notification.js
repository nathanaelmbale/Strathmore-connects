import React, { useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'


const Notification = () => {
    const { user } = useAuthContext()

    useEffect(() => {
        const getNotifications = async () => {
            const response = await fetch('/community', {
                headers: { 'Authorization': `Bearer ${user.token}` },
            })
        }
    })


    return (
        <>
            <p>notification</p>
            {/*/show all notifications*/}

        </>
    )
}

export default Notification