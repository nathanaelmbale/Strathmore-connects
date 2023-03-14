import React, { useEffect } from 'react'
import Communities from '../components/Communities'
import CommunityForm from '../components/CommunityForm'
import PostForm from '../components/PostForm'
import { useAuthContext } from '../hooks/useAuthContext'
import { usePostContext } from '../hooks/usePostsContext'
import Posts from '../components/Posts'
import '../styles/welcome.css'

const Welcome = () => {
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

      <div className=''>
        <div className='row m-0 p-0 '>
          <div className='col-9 border-left'>
            <div className='container p-5'>
              <PostForm></PostForm>
              <Posts></Posts>
            </div>
          </div>
          <div className='col border-left'>
            <CommunityForm></CommunityForm>
            <Communities></Communities>
          </div>
        </div>
      </div>
    </>
  )
}

export default Welcome