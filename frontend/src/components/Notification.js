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
            const response = await fetch('https://strathmoreconnects-backend.onrender.com/user/notification', {
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
                <div className=' notification-bar bg-white shadow-lg'>
                    {notifications.map(notification => (
                        <div className='bg-white m-3 rounded'>
                            <div className='card-body' key={notification._id}>
                                <div className='flex'>
                                    <h3 className='text-lg flex-1'>{notification.title}</h3>
                                    <button onClick={() => deleteNotification(notification)}
                                        className="bg-red-200 p-1.5 mr-4 rounded-full w-8 h-8"
                                    >
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M14.7404 9L14.3942 18M9.60577 18L9.25962 9M19.2276 5.79057C19.5696 5.84221 19.9104 5.89747 20.25 5.95629M19.2276 5.79057L18.1598 19.6726C18.0696 20.8448 17.0921 21.75 15.9164 21.75H8.08357C6.90786 21.75 5.93037 20.8448 5.8402 19.6726L4.77235 5.79057M19.2276 5.79057C18.0812 5.61744 16.9215 5.48485 15.75 5.39432M3.75 5.95629C4.08957 5.89747 4.43037 5.84221 4.77235 5.79057M4.77235 5.79057C5.91878 5.61744 7.07849 5.48485 8.25 5.39432M15.75 5.39432V4.47819C15.75 3.29882 14.8393 2.31423 13.6606 2.27652C13.1092 2.25889 12.5556 2.25 12 2.25C11.4444 2.25 10.8908 2.25889 10.3394 2.27652C9.16065 2.31423 8.25 3.29882 8.25 4.47819V5.39432M15.75 5.39432C14.5126 5.2987 13.262 5.25 12 5.25C10.738 5.25 9.48744 5.2987 8.25 5.39432" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                <p className='text-gray-600'>{notification.description}</p>
                                <Link to={`/posts/${notification._id}`}
                                    className="inline-flex items-center mt-2 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    View more
                                    <svg aria-hidden="true"
                                        className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                            clipRule="evenodd">
                                        </path>
                                    </svg>
                                </Link>


                            </div>
                        </div>
                    ))}
                </div>
                : null}
        </>
    )
}

export default Notification