import React, { useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { usePostContext } from '../hooks/usePostsContext'
import { Outlet } from 'react-router-dom'
import Communities from '../components/Communities'

//allow user to post -comment
//start handling errors



const Community = () => {
    const { user } = useAuthContext()
    const { dispatch } = usePostContext()

    useEffect(() => {
        console.log("me ")

        const fetchPosts = async () => {
            const response = await fetch('/post', {
                headers: { 'Authorization': `Bearer ${user.token}` },
            })

            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_POSTS', payload: json })
            }
        }

        if (user) {
            fetchPosts()
        }
    }, [ user, dispatch])


    return (
        <>
            <section id='community'>
                <div className='bg-white' id='welcome'>
                    <div className='grid grid-cols-1 2xl:grid-cols-12 xl:grid-cols-12 lg:grid-span-12 w-full'>
                        <div className='2xl:col-span-9 xl:col-span-9 lg:col-span-9   w-11/12'>
                            <Outlet />
                        </div>
                        <div id='communities' className='col-span-3 border-l-2'>
                            <Communities ></Communities>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Community