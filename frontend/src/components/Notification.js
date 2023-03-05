import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'


const Notification = () => {
    const { user } = useAuthContext()

    const [notifications, setNotification] = useState([]);
    useEffect(() => {
        console.log("Actual user", user)
        const getNotifications = async () => {
            const response = await fetch('user/notification', {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: user.email })
            })

            const json = await response.json();
            setNotification(json.notification);
            console.log("json:" + JSON.stringify(json))
        }

        if (user) {
            getNotifications()
        }

    }, [user])

    const deleteNotification = async (notification) => {
        const notify = {
            email: user.email,
            notificationId: notification._id,
        }

        fetch('user/notification/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(notify)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);

            }).catch((error) => {
                console.log(error.message)
            })
    }

    return (
        <>
            <p>notification</p>
            {/*/show all notifications*/}
            <ul>
                {notifications.map(notification => (
                    <li key={notification._id}>
                        <h3>{notification.title}</h3>
                        <p>{notification.description}</p>
                        <button className='btn btn-danger' onClick={() => deleteNotification(notification)}>delete</button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Notification