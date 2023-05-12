import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '../hooks/useAuthContext'
import { usePostContext } from '../hooks/usePostsContext'
import { useCommunityContext } from '../hooks/useCommunityContext'

const PostForm = () => {
    const [file, setFile] = useState()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [community, setCommunity] = useState('')
    const [error, setError] = useState('')
    const [communities, setCommunities] = useState(null)
    const { user } = useAuthContext()
    const { dispatch } = usePostContext()
    const { dispatchCommunity } = useCommunityContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(file)
        setError('')
        const email = user.email
        //console.log("email",email)
        const formData = new FormData()
        formData.append('NAME', file)
        formData.append('title', title)
        formData.append('description', description)
        formData.append('category', category)
        formData.append('community', community)
        formData.append('email', email)


        axios.post('http://localhost:5000/post', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorization': `Bearer ${user.token}`
            }
        })
            .then(async (response) => {
                const json = response.data
                console.log("Response post: " + JSON.stringify(json.post))
                /*
                console.log("Response data: " + JSON.stringify(json))
                
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

                setCategory("")
                setDescription("")
                setFile(null)
                setTitle("")
                setCommunity("Select a community")
                console.log("file", file)

            })
            .catch(error => {
                console.error(error.message)
                setError('Missing fiedls')
            });
    }

    useEffect(() => {
        const fetchCommunity = async () => {
            const response = await fetch('http://localhost:5000/community', {
                headers: { 'Authorization': `Bearer ${user.token}` },
            })
            const json = await response.json()

            if (response.ok) {
                dispatchCommunity({ type: 'SET_COMMUNITIES', payload: json })
                setCommunities(json)
            }
        }

        if (user) {
            fetchCommunity()
        }
    }, [user, setCommunities, dispatchCommunity])


    return (
        <>
        {user && user.admin ?
        <div className='w-full border-b-2'>
            {user && user.admin === true ?
                <form onSubmit={handleSubmit} className='mx-auto w-5/6 my-5' >
                    <h1 className='text-4xl'>Post form</h1>


                    <div className="items-center">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            for="file_input">
                            Upload file
                        </label>
                    </div>


                    <input
                        className="block w-full p-2 text-md text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                        id="file_input"
                        type="file"
                        name="NAME"
                        onChange={(e) => {
                            setFile(e.target.files[0])
                        }} />



                    <div className="md-input-box">
                        <input
                            id="Title"
                            name="Title"
                            type="text"
                            className="md-input m-0.5"
                            placeholder=""
                            autoComplete='off'
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
                            type="text"
                            placeholder=""
                            autoComplete='off'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                        <label for="Description" className="md-label text-md">Description</label>
                        <div className="md-input-underline" />

                    </div>

                    <div className="block">
                        <label className="text-md">Type  </label>
                        <select className="md-input rounded-xl pl-4" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Select a type</option>
                            <option value="post">Post</option>
                            <option value="comment">Comment</option>
                        </select>
                    </div>

                    <div className="items-center">
                        <label>Community</label>
                        <select value={community} className="md-input rounded-xl pl-4" onChange={(e) => setCommunity(e.target.value)}>
                            <option value="">Select a community</option>
                            {communities && communities.map(communite => (

                                <option key={communite._id} value={communite._id}>
                                    {communite.name}
                                </option>

                            ))}
                        </select>
                        <span className='text-red-700'>
                            <small>If you don't see the community reload or use previous name</small>
                        </span>
                    </div>

                    <button type="submit"
                        className='inline-flex items-center  mt-2 px-3 py-2 text-sm font-medium text-center
                    text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none
                    focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700
                     dark:focus:ring-blue-800'>Create</button>
                    {error && <div className='alert alert-danger mt-3'>{error}</div>}


                </form>
                : null}

            {user && user.admin === false ?

                <form onSubmit={handleSubmit} className='mx-auto w-5/6 my-5' >
                    <h1 className='text-4xl'>Post form</h1>


                    <div className="items-center">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            for="file_input">
                            Upload file
                        </label>
                    </div>


                    <input
                        className="block w-full p-2 text-md text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                        id="file_input"
                        type="file"
                        name="NAME"
                        onChange={(e) => {
                            setFile(e.target.files[0])
                        }} />



                    <div className="md-input-box">
                        <input
                            id="Title"
                            name="Title"
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
                            type="text"
                            placeholder=""
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                        <label for="Description" className="md-label text-md">Description</label>
                        <div className="md-input-underline" />

                    </div>

                    <div className="block">
                        <label className="text-md">Type  </label>
                        <select className="md-input rounded-xl pl-4" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Select a type</option>
                            <option value="post">Post</option>
                            <option value="comment">Comment</option>
                        </select>
                    </div>

                    <div className="items-center">
                        <label>Community</label>
                        <select value={community} className="md-input rounded-xl pl-4" onChange={(e) => setCommunity(e.target.value)}>
                            <option value="">Select a community</option>
                            {communities && communities.map(communite => (

                                <option key={communite._id} value={communite._id}>
                                    {communite.name}
                                </option>

                            ))}
                        </select>
                        <span className='text-red-700'>
                            <small>If you don't see the community reload or use previous name</small>
                        </span>
                    </div>

                    <button type="submit"
                        className='inline-flex items-center  mt-2 px-3 py-2 text-sm font-medium text-center
                     text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none
                      focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700
                       dark:focus:ring-blue-800'>Submit</button>
                    {error && <div className='alert alert-danger mt-3'>{error}</div>}


                </form>
                : null}

        </div> :
        null}
        </>
    )
}


export default PostForm