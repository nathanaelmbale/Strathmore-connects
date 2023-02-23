const Post = require('../models/postsModel')
const mongoose = require('mongoose')


// get all the posts
const getPosts = async (req, res) => {

    const posts = await Post.find({}).sort({ createdAt: -1 })

    res.status(200).json(posts)
}

const getMyPosts = async (req, res) => {
    const user_id = req.user

    const posts = await Post.find({ user_id }).sort({ createdAt: -1 })

    res.status(200).json(posts)
}

//create a new Item
const createPost = async (req, res) => {
    console.log('Request user:' + req.user._id)
    //defines parameters for the data to be inputed in the database
    const { title, description, category, community ,NAME } = req.body
    
    const imagePath = NAME
    console.log(req.body.imagePath)  
    //adds doc to db
    try {
        console.log("failed here:" + imagePath)
        const user_id = req.user._id
        console.log("failed here:" + user_id)

        if (category == "post") {
            const post = await Post.create({ title, description, category, community, imagePath, user_id })
            console.log("Post made today:" + post)
            res.status(200).json(post)
        }else {
            const post = await Post.create({ title, description, category, community, user_id })
            console.log("Post made today:" + post)
            res.status(200).json(post)
        }       
    

    } catch (error) {
        console.log("failed to upload: " + error.message)
        res.status(400).json({ error: error.message })
    }

}
//delete a Item
const deletePost = async (req, res) => {
    const { id } = req.params
    //checks if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: " No such item" })
    }
    //finds id
    const post = await Post.findOneAndDelete({ _id: id }).sort({ createdAt: -1 })

    if (!post) {
        return res.status(404).json({ error: "post not found" })
    }

    res.status(200).json(post)
    console.log("post was deleted")
}



module.exports = {
    createPost,
    getPosts,
    getMyPosts,
    deletePost
}