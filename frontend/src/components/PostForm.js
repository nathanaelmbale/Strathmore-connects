import React, { useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '../hooks/useAuthContext'

const PostForm = () => {
    const [file, setFile] = useState()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [community, setCommunity] = useState('');
    const { user } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('NAME', file)
        formData.append('title' , title)
        formData.append('description', description);
        formData.append('category', type);
        formData.append('community', community);


        try {
            const response = await axios.post('/post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorization': `Bearer ${user.token}`
                }
            })
            const json = response.data

            console.log("Response :"+json);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                <input type="file" name="NAME" onChange={(e) => {
                            console.log(e.target.files[0])
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
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="">Select a type</option>
                        <option value="post">Post</option>
                        <option value="comment">Comment</option>
                    </select>
                </label>
                <label>
                    Community:
                    <select value={community} onChange={(e) => setCommunity(e.target.value)}>
                        <option value="">Select a community</option>
                        <option value="football">Football</option>
                        <option value="chess">Chess</option>
                        <option value="swimming">Swimming</option>
                    </select>
                </label>

                <button type="submit" className='btn btn-outline-primary'>Submit</button>
            </form>
        </>
    )
}

export default PostForm