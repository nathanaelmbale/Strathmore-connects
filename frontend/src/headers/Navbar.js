import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const handleClick = () => {
        logout()
    }
    return (
        <>

            <nav className='navbar'>
                <a href='/' >Home</a>
                {!user && (
                    <div className='login '>
                        <Link to='/login' className='nav-item pr-3'>Log in</Link>
                        <Link to='/signup' className='nav-item pr-3'>Sign up</Link>
                    </div>
                )}
                {/*Logout */}
                {user && (
                    <>
                        <button className='btn btn-danger container' onClick={handleClick}>
                            Log out
                        </button>
                    </>
                )}
            </nav>

        </>
    )
}

export default Navbar