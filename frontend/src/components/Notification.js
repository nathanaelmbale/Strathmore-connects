import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { Link } from 'react-router-dom'

const Notification = () => {
    const { user } = useAuthContext()
    const [open, setOpen] = useState(false)

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
            <div className="mx-2 relative top-3" onClick={toggleNotification}>

                <svg className='notification-svg' width="25" height="34" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.9985 0C13.8133 0 12.8557 0.949609 12.8557 2.125V3.4C7.96736 4.38281 4.28438 8.67266 4.28438 13.8125V15.0609C4.28438 18.182 3.12591 21.1969 1.03665 23.5344L0.541122 24.0855C-0.0213708 24.7098 -0.155298 25.6063 0.186216 26.3699C0.527729 27.1336 1.29781 27.625 2.14155 27.625H27.8555C28.6992 27.625 29.4626 27.1336 29.8108 26.3699C30.159 25.6063 30.0184 24.7098 29.4559 24.0855L28.9604 23.5344C26.8711 21.1969 25.7127 18.1887 25.7127 15.0609V13.8125C25.7127 8.67266 22.0297 4.38281 17.1414 3.4V2.125C17.1414 0.949609 16.1838 0 14.9985 0ZM18.032 32.7582C18.8355 31.9613 19.2842 30.8789 19.2842 29.75H14.9985H10.7129C10.7129 30.8789 11.1615 31.9613 11.9651 32.7582C12.7686 33.5551 13.8601 34 14.9985 34C16.1369 34 17.2284 33.5551 18.032 32.7582Z" fill="black" />
                </svg>

                <span className="relative  bottom-3 left-4 rounded-full px-1 bg-red-500">
                    <span className=" m-0 p-0">{notifications.length}</span>
                </span>

            </div>

            {open ?
                <div className=' notification-bar rounded'>
                    {notifications.map(notification => (
                        <div className='conatainer'>
                            <div className='card-body' key={notification._id}>
                                <h3>{notification.title}</h3>
                                <p>{notification.description}</p>
                                <Link className='btn btn-primary mr-4' to={`/posts/${notification._id}`}>
                                    view post
                                </Link>

                                <button className='btn btn-danger' onClick={() => deleteNotification(notification)}>delete</button>
                            </div>
                        </div>
                    ))}
                </div>
                : null}
        </>
    )
}

export default Notification