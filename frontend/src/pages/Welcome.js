import React, { useEffect, useState } from 'react'
import Communities from '../components/Communities'
import CommunityForm from '../components/CommunityForm'
import PostForm from '../components/PostForm'
import { useAuthContext } from '../hooks/useAuthContext'
import { usePostContext } from '../hooks/usePostsContext'
import Posts from '../components/Posts'
import '../styles/welcome.css'
import '../styles/main.css'
import EditCommunity from '../components/EditCommunity'

const Welcome = () => {
  const { user } = useAuthContext()
  const { dispatch } = usePostContext()
  const [edit, setEdit] = useState(false)

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
  }, [user, dispatch])


  return (
    <>

      <div className='bg-white'>
        <div className='grid 2xl:grid-cols-12 xl:grid-cols-12 lg:grid-span-12 w-full'>
          <div className='2xl:col-span-9 xl:col-span-9 lg:col-span-9 w-full'>
            <div id='posts' className='w-full pt-5'>
              <PostForm></PostForm>
              <Posts></Posts>
            </div>
          </div>
          <div className='col-span-3 border-l-2'>
            <CommunityForm></CommunityForm>
            {user && user.admin === true ?
              <div className='container'>
                <button className='btn btn-dark container' onClick={() => setEdit(!edit)}>
                  {edit ? 'Delete mode' : 'Edit mode'}
                </button>
              </div>
            :null}
            {edit && edit ?
              <EditCommunity></EditCommunity>
              : <Communities></Communities>}


          </div>
        </div>
      </div>
    </>
  )
}

export default Welcome