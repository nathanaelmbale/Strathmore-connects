import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import { useNavigate } from 'react-router-dom'

const DeleteAccount = () => {
    const { user } = useAuthContext()
    const { logout } = useLogout()

    const navigate = useNavigate()

    const deleteAccount = async () => {
        if (window.confirm("Are you sure you want to remove admin privileges from this user?")) {
            // User clicked "OK"
            const response = fetch('/user/account/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ email: user.email })
            })
    
            if (await response.ok) {
                console.log("logout")
                logout()
                navigate('/signup')
            } else {
                console.log("logo error")
    
            }
            const json = await response.json()
            console.log(json)
          } else {
            // User clicked "Cancel"
            console.log("Cancelled")
          }


    }
    return (
        <div className='mx-3'>
            <h3 className='ml-2'>Delete your account</h3>
            <button className='btn btn-danger container m-2' onClick={deleteAccount}>Delete Account</button>

        </div>
    )
}

export default DeleteAccount