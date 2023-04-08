const express = require('express')

const {
        createPost,
        test,
        getMyPosts,
        getPosts,
        comment,
        deleteComment,
        deletePost
} = require('../controllers/postController')

const requireAuth = require('../middleware/requireAuth')

//require route for all routes
const router = express.Router()

router.use(requireAuth)

//gets all posts
router.get('/', getPosts)


//get my post
router.get('/mypost', getMyPosts)

//make comment
router.post('/comment' , comment)

//delete comment
router.delete('/uncomment' , deleteComment)

//middleware variables
const multer = require('multer')
const path = require('path')
const filename = Date.now()

//storage middleware


const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

const uploading = multer({ dest: '../frontend/src/uploads' })

//POST a posts
router.post('/', upload.single("NAME"), createPost)

router.post('/test', uploading.single('image'), test)

//DELETE a posts
router.delete('/delete', deletePost)

module.exports = router