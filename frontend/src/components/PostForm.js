import React, { useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCommunityContext } from '../hooks/useCommunityContext'

const PostForm = () => {
    const [file, setFile] = useState()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [community, setCommunity] = useState('')
    const { user } = useAuthContext()
    const { communities } = useCommunityContext()

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
        console.log(community+ " community")
        formData.append('email', email)


        axios.post('/post', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorization': `Bearer ${user.token}`
            }
        })
            .then(async (response) => {
                const json = response.data
                /*
                console.log("Response data: " + JSON.stringify(json))
                console.log("Response post: " + JSON.stringify("posts" ,json.post))
                console.log("Response accounts: " + JSON.stringify(json.accounts))
                */

                const notifyUsers = async (email, notificationId, title, description) => {
                    //console.log(email, notificationId, title, description)
                    const userArray = await json.accounts
                    console.log("notify", userArray[0])
                    console.log("notify", userArray.length)

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

            })
            .catch(error => {
                console.error(error);
            });
    }




    return (
        <>
            {user && user.admin === true ?
                <form onSubmit={handleSubmit}>
                    <label>
                        <input type="file" name="NAME" onChange={(e) => {
                            //console.log("The file property",e.target.files[0])
                            const image = e.target.files[0]
                            setFile(image)
                        }} />
                    </label>

                    <label>
                        Title:
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </label>
                    <label>
                        Description:
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </label>
                    <label>
                        Type:
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Select a type</option>
                            <option value="post">Post</option>
                            <option value="comment">Comment</option>
                        </select>
                    </label>
                    <label>
                        Community:
                        <select value={community} onChange={(e) => setCommunity(e.target.value)}>
                            <option value="">Select a community</option>
                            {communities && communities.map(communite => (
                                <>
                                    <option key={communite._id} value={communite._id}>
                                        {communite.name}
                                    </option>
                                </>
                            ))}
                        </select>
                    </label>

                    <button type="submit" className='btn btn-outline-primary'>Submit</button>
                </form>
                : null}
        </>
    )
}


export default PostForm