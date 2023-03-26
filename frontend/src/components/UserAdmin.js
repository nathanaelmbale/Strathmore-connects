import React, { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext";


const UserAdmin = () => {
    const [email, setEmail] = useState("")
    const [isAddingAdmin, setIsAddingAdmin] = useState(false)
    const [isRemovingAdmin, setIsRemovingAdmin] = useState(false)
    const [message, setMessage] = useState("")
    const { user } = useAuthContext()


    const handleAddAdmin = async () => {
        console.log(email)

        try {
            const response = await fetch(`/user/add/admin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, admin: false }),
            })
            const data = await response.json()
            setMessage(data.message)
            setIsAddingAdmin(false)
        } catch (error) {
            setMessage(error.message)
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
            const data = await response.json()
            setMessage(data.message)
            setIsRemovingAdmin(false)
        } catch (error) {
            setMessage(error.message)
        }
    }

    return (
        <div>
            {user && user.admin === true ?

                <div>
                    <h3>User Admin</h3>
                    <input
                        type="text"
                        placeholder="Email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {!isAddingAdmin && !isRemovingAdmin && (
                        <button onClick={() => setIsAddingAdmin(true)}>Add Admin</button>
                    )}
                    {!isAddingAdmin && !isRemovingAdmin && (
                        <button onClick={() => setIsRemovingAdmin(true)}>
                            Remove Admin
                        </button>
                    )}
                    {isAddingAdmin && (
                        <>
                            <div>
                                <button onClick={handleAddAdmin}>Confirm</button>
                                <button onClick={() => setIsAddingAdmin(false)}>Cancel</button>
                            </div>
                        </>
                    )}
                    {isRemovingAdmin && (
                        <>
                            <button onClick={handleRemoveAdmin}>Confirm</button>
                            <button onClick={() => setIsRemovingAdmin(false)}>Cancel</button>
                        </>
                    )}
                    {message && <p>{message}</p>}
                </div> :
                null
            }

        </div>
    )
}

export default UserAdmin
