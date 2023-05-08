import React, { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext";


const UserAdmin = () => {
    const [email, setEmail] = useState("")
    const [isAddingAdmin, setIsAddingAdmin] = useState(false)
    const [isRemovingAdmin, setIsRemovingAdmin] = useState(false)
    const [message, setMessage] = useState("")
    const { user } = useAuthContext()


    const handleAddAdmin = async () => {


        try {
            const response = await fetch(`/user/add/admin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, admin: false }),
            })
            await response.json()

            if (response.ok) setMessage("User added")
            if (!response.ok) setMessage("Something went wrong")
            setIsAddingAdmin(false)
        } catch (error) {
            setMessage("Something went wrong")
        }
    }

    const handleRemoveAdmin = async () => {
        console.log(email)
        try {
            const response = await fetch(`/user/remove/admin`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })
            await response.json()

            if (response.ok) setMessage("User added")
            if (!response.ok) setMessage("Something went wrong")
            setIsRemovingAdmin(false)
        } catch (error) {
            setMessage(error.message)
            console.log(error)
            setMessage("Something went wrong")

        }
    }

    return (
        <div className="border-bottom my-3">
            {user && user.admin === true ?

                <div>
                    <h3 className='text-3xl font-bold'>Admin</h3>
                    <div className=''>
                        <label className='block text-sm'>Email</label>
                        <input
                            type="text"
                            className="block w-full p-2 text-md text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                            placeholder='Type in your email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div className="my-3">
                        {!isAddingAdmin && !isRemovingAdmin && (
                            <button
                                className='inline-flex items-center  mt-2 px-3 py-2 text-sm font-medium text-center
             text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none
             focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700
              dark:focus:ring-blue-800'
                                onClick={() => setIsAddingAdmin(true)}>Add Admin</button>
                        )}
                        {!isAddingAdmin && !isRemovingAdmin && (
                            <button
                                className='mx-2 inline-flex items-center  mt-2 px-3 py-2 text-sm font-medium text-center
                                     text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none
                                     focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-600
                                     dark:focus:ring-red-800'
                                onClick={() => setIsRemovingAdmin(true)}>
                                Remove Admin
                            </button>
                        )}
                        {isAddingAdmin && (
                            <>
                                <div className="m-2">
                                    <button
                                        className='inline-flex items-center  mt-2 px-3 py-2 text-sm font-medium text-center
                                    text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none
                                    focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700
                                     dark:focus:ring-blue-800'
                                        onClick={handleAddAdmin}>Confirm</button>
                                    <button
                                        className='mx-2 inline-flex items-center  mt-2 px-3 py-2 text-sm font-medium text-center
                                     text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none
                                     focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-600
                                     dark:focus:ring-red-800'
                                        onClick={() => setIsAddingAdmin(false)}>Cancel</button>
                                </div>
                            </>
                        )}
                        {isRemovingAdmin && (
                            <>
                                <div className="m-2">
                                    <button className="btn btn-outline-primary mx-3" onClick={handleRemoveAdmin}>Confirm</button>
                                    <button
                                        className='mx-2 inline-flex items-center  mt-2 px-3 py-2 text-sm font-medium text-center
                                     text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none
                                     focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-600
                                     dark:focus:ring-red-800'
                                        onClick={() => setIsRemovingAdmin(false)}>Cancel</button>
                                </div>
                            </>
                        )}
                        {message && <p className="bg-green-300 text-green-500 border-2 border-green-500 rounded-lg py-1.5 mt-3 px-1">
                            {message}
                            </p>}
                    </div>
                </div>
                :
                null
            }

        </div>
    )
}

export default UserAdmin
