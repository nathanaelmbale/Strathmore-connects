import React, { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogin } from '../hooks/useLogin'


const ChangePassword = () => {
    const { user } = useAuthContext()
    const { login, error, isLoading } = useLogin()
    const [currentPassowrd, setCurrentPassowrd] = useState("")
    const [newPassowrd, setNewPassowrd] = useState("")
    const [success, setSuccess] = useState("")
    const [visible, setVisible] = useState(false)

    const changeUserPassoword = async (e) => {
        e.preventDefault()
        const email = user.email
        const response = await fetch('https://strathmoreconnects-backend.onrender.com/user/password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: newPassowrd })
        })
        const json = await response.json()

        setSuccess(JSON.stringify(json.message))
        if (json) {
            setCurrentPassowrd("")
            setNewPassowrd("")
        }
    }

    const confirmPassword = async (e) => {
        e.preventDefault()
        await login(user.email, currentPassowrd)
        setVisible(true)
    }
    return (
        <div className=''>
            <h2 className='text-2xl font-bold '>Change password</h2>
            <form className='my-2' onSubmit={confirmPassword}>
                <div className="md-input-box">
                    <input
                        name="cpassword"
                        type="password"
                        className="block w-full p-2 text-md text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                        placeholder="Current password"
                        autoComplete='on'
                        value={currentPassowrd}
                        onChange={(e) => setCurrentPassowrd(e.target.value)}
                    />
                </div>
                <button className='inline-flex items-center  mt-2 px-3 py-2 text-sm font-medium text-center
                    text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none
                    focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700
                     dark:focus:ring-blue-800' disabled={isLoading} >Confirm</button>
                {visible ? <>
                    {error ? <div className='bg-red-300 text-red-500 border-2 border-red-500 rounded-lg py-1.5 mt-3 px-1 text-center'>{error}</div> :
                        <>
                            <div className='bg-green-300 text-green-500 border-2 border-green-500 rounded-lg py-1.5 mt-3 px-1'
                            ><p><center>Correct password</center></p>
                            </div>
                            <form className='my-3' onSubmit={changeUserPassoword}>
                                <div className="md-input-box">
                                    <input
                                        name="password"
                                        type="password"
                                        className="block w-full p-2 text-md text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                                        placeholder="New password"
                                        autoComplete='on'
                                        value={newPassowrd}
                                        onChange={(e) => setNewPassowrd(e.target.value)}
                                    />
                                </div>
                                <button disabled={isLoading} className='inline-flex items-center  mt-2 px-3 py-2 text-sm font-medium text-center
                    text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none
                    focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700
                     dark:focus:ring-blue-800'
                                    type='submit'>Change Password</button>
                                {success && <div className='success alert-success'>{success}</div>}

                            </form> </>}
                </> : null}

            </form>


            {/*Change the password*/}

        </div>
    )
}

export default ChangePassword