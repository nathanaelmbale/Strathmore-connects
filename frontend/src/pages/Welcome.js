import React, { useEffect, useState } from 'react'
import Communities from '../components/Communities'
import CommunityForm from '../components/CommunityForm'
import PostForm from '../components/PostForm'
import { useAuthContext } from '../hooks/useAuthContext'
import { usePostContext } from '../hooks/usePostsContext'
import Posts from '../components/Posts'
import '../styles/welcome.css'
import EditCommunity from '../components/EditCommunity'

const Welcome = () => {
  const { user } = useAuthContext()
  const { dispatch } = usePostContext()
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('https://strathmoreconnects-backend.onrender.com/post', {
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

      <div className='bg-white' id='welcome'>
        <div className='row m-0 p-0 '>
          <div className='col-9 m-2'>
            <div id='posts' className='container w-100 p-5'>
              <PostForm></PostForm>
              <Posts></Posts>
            </div>
          </div>
          <div id='community' className='col m-0 p-0 border-left absolute top-0 left-0 w-full h-auto z-10 sm:static sm:w-auto sm:h-full sm:z-0'>
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