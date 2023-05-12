import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import { useNavigate } from 'react-router-dom'

const DeleteAccount = () => {
    const { user } = useAuthContext()
    const { logout } = useLogout()

    const navigate = useNavigate()

    const deleteAccount = async () => {
        if (window.confirm("Are you sure you want permanently delete your account?")) {
            // User clicked "OK"
            const response = fetch('http://localhost:5000/user/account/delete', {
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
            <button 
            className='mx-2 inline-flex items-center  mt-2 px-3 py-2 text-sm font-medium text-center
            text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none
            focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-600
            dark:focus:ring-red-800'
            onClick={deleteAccount}>Delete Account</button>

        </div>
    )
}

export default DeleteAccount