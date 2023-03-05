const express = require('express')

const {
    createCommunity,
    getCommunities,
    removeAccountFromCommunity,
    deleteCommunity
} = require('../controllers/communityController')

const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

//Middleware to authetify user
const requireAuth = async (req , res , next) => {

    //Verify authentification
    const { authorization } = req.headers 

    if(!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.SECRET)

        req.user =  await User.findOne({_id}).select('_id')
        next()
    }catch(error){
        console.log(error);
        res.status(401).json({ error: "Request is not authorised"})
    }
}

//require route for all routes
const router = express.Router()

router.use(requireAuth)

//gets all Communities
router.get('/', getCommunities)

//POST a Communities
router.post('/', createCommunity)
router.post('/unjoin', removeAccountFromCommunity)

//DELETE a Communities
router.delete('/delete', deleteCommunity)

module.exports = router;