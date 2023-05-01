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

        const fetchPosts = async () => {
            const response = await fetch('https://strathmoreconnects-backend.onrender.com/post', {
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
                    <div className='row m-0 p-0'>
                        <div className='col-12 col-md-9 m-2 absolute top-0 left-0 w-full h-auto z-10'>
                            <Outlet />
                        </div>
                        <div id='communities' className='col m-0 p-0 border-left absolute top-0 left-0 w-full h-auto z-10 sm:static sm:w-auto sm:h-full sm:z-0'>
                            <Communities ></Communities>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Community