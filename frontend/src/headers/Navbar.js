import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import Notification from '../components/Notification'
import '../styles/main.css'
import Logo from '../images/logo.png'


const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const handleClick = () => {
        logout()
    }
    return (
        <>
            <div className='nav-controller'></div>
            <nav id='navbar' className='fixed-top shadow-lg bg-light border-bottom'>
                <div className='container'>
                    <div className='row align-items-center'>
                        <div className='col'>
                            <div className='d-flex'>
                                <img className="my-3" alt='strathmore connect logo' height='20px' src={Logo}></img>

                                <a href='/' className='nav-link pr-3 d-flex align-items-center justify-content-center'>Home</a>
                            </div>
                        </div>
                        <div className='col-6 d-none d-md-block'></div>
                        <div className='col'>
                            {!user && (
                                <div className='nav-item d-flex align-middle'>
                                    <Link to='/login' className='nav-link pr-3'>Log in</Link>
                                    <Link to='/signup' className='nav-link pr-3'>Sign up</Link>
                                </div>
                            )}
                            {/*Logout */}
                            {user && (
                                <div className='nav-item d-flex  align-middle'>
                                    <div>
                                        <Link to='/settings' className='nav-link pr-3'>Settings</Link>
                                    </div>
                                    <div className='notification align-middle'>
                                        <Notification></Notification>
                                    </div>

                                    <div className='pl-5'>
                                        <button className='btn btn-danger' onClick={handleClick}>
                                            Log out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </nav>

        </>
    )
}

export default Navbar