import React, { useEffect } from 'react'
import Communities from '../components/Communities'
import CommunityForm from '../components/CommunityForm'
import PostForm from '../components/PostForm'
import { useAuthContext } from '../hooks/useAuthContext'
import { usePostContext } from '../hooks/usePostsContext'

const Welcome = () => {
  const { user } = useAuthContext()
  const { posts, dispatch } = usePostContext()

  useEffect(() => {

    const fetchPosts = async () => {
      const response = await fetch('/post', {
        headers: { 'Authorization': `Bearer ${user.token}` },
      })
      const json = await response.json()
      console.log("json:" + JSON.stringify(json))
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
      <div className='row'>
        <div className='col'>
          <PostForm></PostForm>
          <div className='mt-3 mb-4'></div>
          {posts && posts.map(post => (
            <div key={post._id}>

              <h4>{post.title}</h4>
              <p>{post.description}</p>
            </div>
          ))}
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