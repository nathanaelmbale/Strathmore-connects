import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '../hooks/useAuthContext'
import { usePostContext } from '../hooks/usePostsContext'
import { useParams } from 'react-router-dom'


const CommunityPost = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [community, setCommunity] = useState(null)
    const { user } = useAuthContext()
    const { dispatch } = usePostContext()
    const { communityId } = useParams()

    useEffect(() => {
        
        console.log("Hello World")

        const fetchCommunity = async () => {
            const response = await fetch('/community', {
                headers: { 'Authorization': `Bearer ${user.token}` },
            })

            const commune = await response.json()

            const communityee = commune && commune.find(c => c._id === communityId)
            setCommunity(communityee._id)

        }

        fetchCommunity()

    }, [communityId ,user])

    const handleSubmit = async (e) => {
        e.preventDefault()

        //auto-set community
        //autoset category
        const email = user.email

        const formData = new FormData()

        formData.append('title', title)
        formData.append('description', description)
        formData.append('category', 'comment')
        formData.append('community', community)
        formData.append('email', email)


        axios.post('/post', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorization': `Bearer ${user.token}`
            }
        })
            .then(async (response) => {
                const json = response.data
                console.log("Response post: " + JSON.stringify(json.post))
                /*

                console.log("Response accounts: " + JSON.stringify(json.accounts))
                */
                dispatch({ type: "CREATE_POST", payload: json.post })
                const notifyUsers = async (email, notificationId, title, description) => {
                    console.log(email, notificationId, title, description)
                    const userArray = await json.accounts

                    for (let i = 0; i < userArray.length; i++) {
                        console.log(userArray[i]);
                        const _id = userArray[i]

                        const body = {
                            email,
                            notificationId,
                            title,
                            description,
                            _id
                        }

                        try {
                            const response = await fetch('user/notification/add', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    authorization: `Bearer ${user.token}`,
                                },
                                body: JSON.stringify(body)
                            });
                            const json = await response.json();
                            console.log('Notification sent:', json);
                        } catch (error) {
                            console.error(error);
                        }
                    }

                }

                if (json.accounts[0]) {
                    notifyUsers(
                        user.email,
                        json.post._id,
                        json.post.title,
                        json.post.description

                    )
                }
                /*
                setCategory("")
                setCommunity(null)
                setDescription("")
                setFile(null)
                setTitle("")
                setCommunity("Select a community")
                */
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className='card mt-3'>

            <form className=' m-3' onSubmit={handleSubmit} >
                <h4><center>Make a community post</center></h4>
                <div className="form-group">
                    <label>
                        Title:</label>
                    <input className="form-control" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

                </div>

                <div className="form-group">
                    <label>Description:</label>
                    <input className="form-control" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>



                <button type="submit" className='btn btn-primary container'>Post</button>

            </form>
        </div>
    )
}

export default CommunityPost