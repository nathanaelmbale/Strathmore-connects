import { useAuthContext } from './useAuthContext'
import { usePostContext } from './usePostsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: postsDispatch } = usePostContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    postsDispatch({ type: 'SET_ITEMS', payload: null})
  }

  return { logout }
}