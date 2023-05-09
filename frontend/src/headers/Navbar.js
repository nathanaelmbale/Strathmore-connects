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
            <div className='m-4'>t</div>
            
            <nav id='navbar' className='fixed block top-0 shadow-sm bg-white border-b w-full z-50'>
                <div className='container'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <a href='/' className='hover:text-blue-900 pr-3 flex items-center justify-center'>
                            <img className="my-3 h-5" alt='strathmore connect logo' height='20px' src={Logo}></img>
                            <span className='ml-2 lg:block md:block sm:hidden'>Home</span>
                            </a>
                        </div>
                        <div className='flex items-center'>
                            {!user && (
                                <div className='flex items-center'>
                                    <Link to='/login' className='hover:text-blue-900 pr-3'>Log in</Link>
                                    <Link to='/signup' className='hover:text-blue-900 pr-3'>Sign up</Link>
                                </div>
                            )}
                            {/*Logout */}
                            {user && (
                                <div className='flex items-center mx-2'>
                                    <div>
                                        <Link to='/settings' className='hover:text-blue-900 pr-3'>Settings</Link>
                                    </div>
                                    <div className='notification'>
                                        <Notification></Notification>
                                    </div>
                                    <div className='pl-5'>
                                        <button className=' bg-red-600 rounded-lg text-white py-1.5 px-2.5' onClick={handleClick}>
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