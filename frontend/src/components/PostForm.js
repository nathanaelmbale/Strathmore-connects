import React, { useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCommunityContext } from '../hooks/useCommunityContext'
import { usePostContext } from '../hooks/usePostsContext'

const PostForm = () => {
    const [file, setFile] = useState()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [community, setCommunity] = useState('')
    const { user } = useAuthContext()
    const { communities } = useCommunityContext()
    const { dispatch } = usePostContext() 
    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = user.email
        //console.log("email",email)
        const formData = new FormData()
        formData.append('NAME', file)
        formData.append('title', title)
        formData.append('description', description)
        formData.append('category', category)
        formData.append('community', community)
        //console.log(community+ " community")
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
                console.log("Response data: " + JSON.stringify(json))
                
                console.log("Response accounts: " + JSON.stringify(json.accounts))
                */
                dispatch({ type: "CREATE_POST", payload: json.post })
                const notifyUsers = async (email, notificationId, title, description) => {
                    //console.log(email, notificationId, title, description)
                    const userArray = await json.accounts

                    for (let i = 0; i < userArray.length; i++) {
                        //console.log(userArray[i]);
                        const _id = userArray[i]

                        const body = {
                            email,
                            notificationId,
                            title,
                            description,
                            _id
                        }

                        try {
                            await fetch('user/notification/add', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    authorization: `Bearer ${user.token}`,
                                },
                                body: JSON.stringify(body)
                            });
                            //const json = await response.json();
                            //console.log('Notification sent:', json);
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
                setCommunity(null)
                setDescription("")
                setFile(null)
                setTitle("")
                setCommunity("Select a community")

            })
            .catch(error => {
                console.error(error);
            });
    }




    return (
        <>
            {user && user.admin === true ?
                <form onSubmit={handleSubmit} className="container m-4">
                    <div className='container'>
                    <div className="form-group">
                        <label>Image </label>
                        <input className="form-control" type="file" name="NAME" onChange={(e) => {
                            //console.log("The file property",e.target.files[0])
                            const image = e.target.files[0]
                            setFile(image)
                        }} />
                    </div>

                    <div className="form-group">

                        <label>
                            Title:</label>
                        <input className="form-control" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

                    </div>

                    <div className="form-group">
                    <label>Description:</label>
                    <input className="form-control" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    <div className="form-group">
                    <label>Type:  </label>
                    <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select a type</option>
                        <option value="post">Post</option>
                        <option value="comment">Comment</option>
                    </select>
                    </div>

                    <div className="form-group">
                    <label>Community:</label>
                    <select value={community} className="form-control" onChange={(e) => setCommunity(e.target.value)}>
                        <option value="">Select a community</option>
                        {communities && communities.map(communite => (
                            <>
                                <option key={communite._id} value={communite._id}>
                                    {communite.name}
                                </option>
                            </>
                        ))}
                    </select>
                    </div>

                    <button type="submit" className='btn btn-outline-primary'>Submit</button>
                    </div>
                </form>
                : null}
        </>
    )
}


export default PostForm