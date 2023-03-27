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
                    <h3>Admin</h3>
                    <input
                        type="text"
                        placeholder="Email"
                        className="form-control my-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="my-3">
                        {!isAddingAdmin && !isRemovingAdmin && (
                            <button className="btn btn-outline-primary mx-3" onClick={() => setIsAddingAdmin(true)}>Add Admin</button>
                        )}
                        {!isAddingAdmin && !isRemovingAdmin && (
                            <button className="btn btn-danger " onClick={() => setIsRemovingAdmin(true)}>
                                Remove Admin
                            </button>
                        )}
                        {isAddingAdmin && (
                            <>
                                <div className="m-2">
                                    <button className="btn btn-outline-primary mx-3" onClick={handleAddAdmin}>Confirm</button>
                                    <button className="btn btn-danger" onClick={() => setIsAddingAdmin(false)}>Cancel</button>
                                </div>
                            </>
                        )}
                        {isRemovingAdmin && (
                            <>
                                <div className="m-2">
                                    <button className="btn btn-outline-primary mx-3" onClick={handleRemoveAdmin}>Confirm</button>
                                    <button className="btn btn-danger" onClick={() => setIsRemovingAdmin(false)}>Cancel</button>
                                </div>
                            </>
                        )}
                        {message && <p>{message}</p>}
                    </div>
                </div> 
                :
                null
            }

        </div>
    )
}

export default UserAdmin
