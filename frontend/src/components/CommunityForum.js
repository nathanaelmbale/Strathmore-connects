import React, { useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { usePostContext } from '../hooks/usePostsContext'
import Posts from '../components/Posts'
import Communities from '../components/Communities'


const CommunityForum = () => {
    const { user } = useAuthContext()
    const { dispatch } = usePostContext()

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/post', {
                headers: { 'Authorization': `Bearer ${user.token}` },
            })
            const json = await response.json()
            //console.log("json:" + JSON.stringify(json))
            //test = JSON.stringify(json)

            if (response.ok) {
                dispatch({ type: 'SET_POSTS', payload: json })
            }
        }

        if (user) {
            fetchPosts()

        }
    }, [dispatch, user])
    return (
        <>
            <div className='bg-white' id='welcome'>
                <div className='row m-0 p-0'>
                    <div className='col-12 col-md-9 m-2 absolute top-0 left-0 w-full h-auto z-10'>
                        <div id='posts' className='container w-100 '>
                            <Posts></Posts>
                        </div>
                    </div>
                    <div id='community' className='col m-0 p-0 border-left absolute top-0 left-0 w-full h-auto z-10 sm:static sm:w-auto sm:h-full sm:z-0'>
                        <Communities></Communities>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CommunityForum