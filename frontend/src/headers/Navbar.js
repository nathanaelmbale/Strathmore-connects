import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import Notification from '../components/Notification'
import '../styles/main.css'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const handleClick = () => {
        logout()
    }
    return (
        <>
            <nav className='sticky-top shadow-lg bg-light'>
                <div className='row'>
                    <div className='col'>
                        <a href='/' >Home</a>
                    </div>
                    <div className='col-8'></div>
                    <div className='col'>
                        {!user && (
                            <div className='login '>
                                <Link to='/login' className='nav-item pr-3'>Log in</Link>
                                <Link to='/signup' className='nav-item pr-3'>Sign up</Link>
                            </div>
                        )}
                        {/*Logout */}
                        {user && (
                            <div className='d-flex'>
                                <div className='notification'>
                                    <Notification></Notification>
                                </div>

                                <div className='pl-4'>
                                    <button className='btn btn-danger' onClick={handleClick}>
                                        Log out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>


            </nav>

        </>
    )
}

export default Navbar