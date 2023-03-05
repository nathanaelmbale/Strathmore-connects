const Post = require('../models/postsModel')
const Community = require('../models/communityModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')


// get all the posts
const getPosts = async (req, res) => {
    const posts = await Post.find({}).sort({ createdAt: -1 })

    res.status(200).json(posts)
}

const getMyPosts = async (req, res) => {
    const user_id = req.user

    const posts = await Post.findById({ _id: user_id }).sort({ createdAt: -1 })

    res.status(200).json(posts)
}



//create a new Item
const createPost = async (req, res) => {
    //defines parameters for the data to be inputed in the database
    const { title, description, category, community , email } = req.body
    //the community name used to find the users of a commmunity
    const communityId = community
    //this is the image path
    const imagePath = req.file && req.file.filename


    //adds doc to db
    try {
        //this os the user making the post
        const user = await User.findOne({email: email})
        const user_id = user._id
        console.log(user)
        console.log(req.user)

        if (category == "post") {
            //the schema takes in title category communityId , imagepath(optional) , user_id
            const post = await Post.create({ title, description, category, communityId, imagePath, user_id })
            //confirm post has been made
            console.log("Post made today:" + post)
            //find the community by its name and get the accounts in that community
            const accountList = await Community.findById({ _id: communityId })
            const accounts = accountList.accounts
            console.log("here")

            res.status(200).json({ post, accounts })
        } else {
            //the schema takes in title category communityId , imagepath(optional) , user_id
            const post = await Post.create({ title, description, category, communityId, imagePath, user_id })
            //confirm post has been made
            console.log("Post made today:" + post)
            //find the community by its name and get the accounts in that community
            const accountList = await Community.findById({ _id: communityId })
            const accounts = accountList.accounts
            console.log("here")


            res.status(200).json({ post, accounts })
        }

    } catch (error) {
        console.log("failed to upload: " + error.message)
        res.status(400).json({ error: error.message })
    }

}

//add a comment
const comment = async (req, res) => {
    const { _id, comment, user } = req.body;
    console.log(req.body)


    try {
        const post = await Post.findById({ _id: _id })
        if (!post) {
            throw Error('Invalid post')
        }
        // create new Comment object
        const newComment = {
            comment: comment,
            user: user
        }

        post.comments.push(newComment)
        await post.save()

        res.status(200).json(post.comments)

    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}
//delete comment
const deleteComment = async (req, res) => {
    const { postId, commentId } = req.body;
  
    try {
      const post = await Post.findById(postId);
  
      if (!post) {
        throw Error('Invalid post');
      }
  
      const commentIndex = post.comments.findIndex(comment => comment._id == commentId);
  
      if (commentIndex === -1) {
        throw Error('Invalid comment');
      }
  
      post.comments.splice(commentIndex, 1);
      await post.save();
  
      res.status(200).json({ message: 'Comment deleted successfully' , comment :post.comments });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
//delete a Item
const deletePost = async (req, res) => {
    const { _id } = req.body
    //checks if id is valid
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        res.status(404).json({ error: " No such post" })
    }
    //finds id
    const post = await Post.findById({ _id: _id }).sort({ createdAt: -1 })

    if (!post) {
        return res.status(404).json({ error: "post not found" })
    }

    // delete the post from the database
    await post.remove()



    res.status(200).json({ message: "post was deleted", posts: post })
    console.log("post was deleted", post)
}



module.exports = {
    createPost,
    getPosts,
    getMyPosts,
    comment,
    deleteComment,
    deletePost
}