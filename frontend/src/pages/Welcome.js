import React, { useEffect } from 'react'
import Communities from '../components/Communities'
import CommunityForm from '../components/CommunityForm'
import PostForm from '../components/PostForm'
import Notification from '../components/Notification'
import { useAuthContext } from '../hooks/useAuthContext'
import { usePostContext } from '../hooks/usePostsContext'
import Posts from '../components/Posts'

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
  }, [ dispatch, user])




  return (
    <>
      Welcome home
      <Notification></Notification>
      <div className='row'>
        <div className='col'>
          <PostForm></PostForm>
          <Posts></Posts>
        </div>
        <div className='col'>
          <CommunityForm></CommunityForm>
          <Communities></Communities>
        </div>
      </div>
    </>
  )
}

export default Welcome