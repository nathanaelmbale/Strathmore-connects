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
    const openMenu = () => {
        const navBtn = document.querySelector('#menu');
        const menuBar = document.querySelector('[role="menubar"]');


        const isExpanded = JSON.parse(navBtn.getAttribute('aria-expanded'));
        navBtn.setAttribute('aria-expanded', !isExpanded);
        menuBar.classList.toggle('hidden');
        menuBar.classList.toggle('flex');
    }
    return (
        <>
            <div className='m-4'>.</div>

            <nav id='navbar' className='fixed block top-0 shadow-sm bg-white border-b w-full z-50 '>
                <div className='mx-auto w-10/12'>
                    <div className='flex  items-center justify-between '>
                        <div className='flex items-center basis-3/4'>
                            <a href='/' aria-label='go to home page' className='hover:text-blue-900 pr-3
                             flex items-center justify-center h-14 focus:outline-none focus-visible:ring-2 ring-blue-400
                             rounded-md ring-offset-2 ring-offset-transparent'>
                                <span className='font-bold text-xl ml-3'>SC</span>
                                <span className='ml-2 lg:block md:block sm:hidden'>Home</span>
                            </a>
                        </div>

                        <div id="menu" className='lg:hidden '
                            onClick={() => openMenu()}
                            aria-expanded="false"
                            aria-label='Open menu'>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-8 h-8 
                                focus:outline-none 
                                focus-visible:ring-2
                                hover:text-neutral-600 transition-colors
                                ring-blue-400">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>


                        </div>

                        {!user && (
                            <div role='menubar'
                                className='
                                hidden 
                                items-center
                                 flex-col 
                                 gap-4  
                                 w-full
                                 absolute
                                 top-16 left-0 bg-white dark:bg-neutral-800 shadow-lg p-6
                                 text-center
                                 lg:flex
                                 lg:flex-1
                                 lg:flex-row
                                 lg:static
                                 lg:shadow-none
                                 
                                 lg:gap-1
                                 lg:p-2
                                 
                                
                                 '>
                                <Link role='menuitem' to='/login' className='hover:text-white py-1.5 px-6  
                                focus:outline-none  w-full lg:w-3/4
                                rounded-md
                                focus-visible:ring-2
                                 transition-colors
                                 
                                 hover:bg-gray-400 
                                ring-blue-400 '>Log in</Link>
                                <Link role='menuitem' to='/signup' className='hover:bg-blue-900 py-1.5 px-6  
                                focus:outline-none 
                                w-full lg:w-3/4
                                focus-visible:ring-2
                                bg-blue-600  rounded-md shadow-lg hover:shadow-none
                                 transition-colors
                                 text-white font-bold
                                ring-blue-400 
                                lg:shadow-md'>Sign up</Link>
                            </div>
                        )}

                        {/* <div id='wrong' className='lg:hidden'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-8 h-8 
                                rounded-md ring-offset-2 
                                hover:text-neutral-600 transition-colors
                                ring-offset-transparent">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div> */}
                        {/*Logout */}
                        {user && (
                            <div role='menubar'
                                className='
                                hidden 
                                items-center
                                 flex-col 
                                 gap-4  
                                 w-full
                                 absolute
                                 top-16 left-0 bg-white dark:bg-neutral-800 shadow-lg p-6
                                 text-center
                                 lg:flex
                                 lg:flex-1
                                 lg:flex-row
                                 lg:static
                                 lg:shadow-none
                                 
                                 lg:gap-1
                                 lg:p-2
                                 
                                
                                 '>
                                <Link role='menuitem' to='/settings' className='hover:text-white py-1.5 px-6  
                                focus:outline-none  w-full lg:w-3/4
                                rounded-md
                                focus-visible:ring-2
                                 transition-colors
                                 
                                 hover:bg-gray-400 
                                ring-blue-400 '>Settings</Link>


                                <button
                                    role='menuitem'
                                    className='hover:bg-red-700 py-1.5 px-6  
                                focus:outline-none 
                                w-full 
                                focus-visible:ring-2
                                bg-red-600  rounded-md shadow-lg hover:shadow-none
                                 transition-colors
                                 text-white font-bold
                                ring-red-400 
                                lg:shadow-md' onClick={handleClick}>
                                    Log out
                                </button>

                                <div className='notification'>
                                    <Notification></Notification>
                                </div>

                            </div>
                        )}

                    </div>
                </div>
            </nav >

        </>
    )
}

export default Navbar