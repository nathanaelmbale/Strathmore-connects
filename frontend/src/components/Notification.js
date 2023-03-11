import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { Link } from 'react-router-dom'

const Notification = () => {
    const { user } = useAuthContext()
    const [ open, setOpen] = useState(false)

    const [notifications, setNotification] = useState([]);
    useEffect(() => {
        //console.log("Actual user", user)
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
            //console.log("json:" + JSON.stringify(json))
        }

        if (user) {
            getNotifications()
        }

    }, [user])

    const deleteNotification = async (notification) => {

        //loop accounts here
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

    const toggleNotification = () => {
        setOpen(!open)
        console.log(open)
    }

    return (
        <>
            {/*/show all notifications*/}
            <div class="" onClick={toggleNotification}>

                <svg className='m-0 p-0' width="30" height="35" viewBox="0 0 42 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_201_2)">
                        <path d="M21.0002 0C19.3409 0 18.0002 1.34062 18.0002 3V4.8C11.1565 6.1875 6.00023 12.2437 6.00023 19.5V21.2625C6.00023 25.6688 4.37835 29.925 1.45335 33.225L0.759605 34.0031C-0.0278953 34.8844 -0.215395 36.15 0.26273 37.2281C0.740855 38.3063 1.81898 39 3.00023 39H39.0002C40.1815 39 41.2502 38.3063 41.7377 37.2281C42.2252 36.15 42.0284 34.8844 41.2409 34.0031L40.5471 33.225C37.6221 29.925 36.0002 25.6781 36.0002 21.2625V19.5C36.0002 12.2437 30.844 6.1875 24.0002 4.8V3C24.0002 1.34062 22.6596 0 21.0002 0ZM25.2471 46.2469C26.3721 45.1219 27.0002 43.5938 27.0002 42H21.0002H15.0002C15.0002 43.5938 15.6284 45.1219 16.7534 46.2469C17.8784 47.3719 19.4065 48 21.0002 48C22.594 48 24.1221 47.3719 25.2471 46.2469Z" fill="#777777" />
                    </g>
                    <defs>
                        <clipPath id="clip0_201_2">
                            <rect width="42" height="48" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
                <span class="badge badge-danger">{notifications.length}</span>
            </div>

            {open ?
            <span className='conatainer notification-bar'>
                {notifications.map(notification => (
                    <span className='card-body' key={notification._id}>
                        <h3>{notification.title}</h3>
                        <p>{notification.description}</p>
                        <Link className='btn btn-primary mr-4' to={`/posts/${notification._id}`}>
                           view post 
                        </Link>

                        <button className='btn btn-danger' onClick={() => deleteNotification(notification)}>delete</button>
                    </span>
                ))} 
            </span>
            : null }
        </>
    )
}

export default Notification