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
            const response = await fetch('https://strathmoreconnects-backend.onrender.com/community', {
                headers: { 'Authorization': `Bearer ${user.token}` },
            })

            const commune = await response.json()

            const communityee = commune && commune.find(c => c._id === communityId)
            setCommunity(communityee._id)

        }

        fetchCommunity()

    }, [communityId, user])

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


        axios.post('https://strathmoreconnects-backend.onrender.com/post', formData, {
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
                setDescription('')
                setTitle('')

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

            <form className='shadow-sm border my-5 ml-4 p-5 md:m-6 rounded-lg ' onSubmit={handleSubmit} >
                <h4 className='text-2xl font-bold'>Make a community post</h4>

                <div className="md-input-box">
                    <input
                        id="Title"
                        name="Title"
                        autoComplete='off'
                        type="text"
                        className="md-input m-0.5"
                        placeholder=""
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label for="Title" className="md-label text-md">Title</label>
                    <div className="md-input-underline" />
                </div>

                <div className="md-input-box">
                    <input
                        id="Description"
                        name="Description"
                        className="md-input m-0.5"
                        autoComplete='off'
                        type="text"
                        placeholder=""
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} />
                    <label for="Description" className="md-label text-md">Description</label>
                    <div className="md-input-underline" />

                </div>
                <div className='px-10 my-4'>
                    <button
                        type="submit"
                        className='w-full  items-center  mt-2 px-3 py-2 mx-auto text-sm font-medium text-center
                    text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none
                    focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700
                     dark:focus:ring-blue-800'><center>Make post</center></button>
                </div> 
            </form>
        </div>
    )
}

export default CommunityPost