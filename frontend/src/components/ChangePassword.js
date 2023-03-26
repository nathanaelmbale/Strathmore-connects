import React, { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogin } from '../hooks/useLogin'


const ChangePassword = () => {
    const { user } = useAuthContext()
    const { login, error, isLoading } = useLogin()
    const [currentPassowrd, setCurrentPassowrd] = useState("")
    const [newPassowrd, setNewPassowrd] = useState("")
    const [isAproved, setIsApproved] = useState(false)
    const [success, setSuccess] = useState("")

    const changeUserPassoword = async (e) => {
        e.preventDefault()
        const email = user.email
        const response = await fetch('/user/password', {
            method: 'PATCH',
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
        console.log(user.email, currentPassowrd)
        if (!error) setIsApproved(true)
    }
    return (
        <div>
            <h2>Change password</h2>
            <form className='container' onSubmit={confirmPassword}>
                <div className='mb-3'>
                    <label className='form-label'>Password</label>
                    <input type='password' className='form-control mb-3' placeholder='Type your current password' value={currentPassowrd} onChange={(e) => setCurrentPassowrd(e.target.value)} />
                    <button className='btn btn-primary container' disabled={isLoading} >Confirm</button>
                    {error && <div className='alert alert-danger'>{error}</div>}
                    {isAproved && <div className='succes alert-success rounded my-2 pt-1'><p><center>Correct password</center></p></div>}
                </div>
            </form>


            {/*Change the password*/}
            {isAproved &&
                <form className='container' onSubmit={changeUserPassoword}>
                    <div className='mb-3'>
                        <label className='form-label'>New password</label>
                        <input type='password' value={newPassowrd} className='form-control mb-3' placeholder='Type your new password' onChange={(e) => setNewPassowrd(e.target.value)} />
                    </div>
                    <button disabled={isLoading} className='btn btn-outline-danger container' type='submit'>Change Password</button>
                    {success && <div className='success alert-success'>{success}</div>}

                </form>
            }
        </div>
    )
}

export default ChangePassword