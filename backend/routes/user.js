const express = require('express')

//controller functions
const { loginUser, signupUser ,myNotification , userNotification ,DeleteNotification } =require('../controllers/userController')

const router = express.Router()

//login route
router.post('/login', loginUser)

//Signup route
router.post('/signup', signupUser)

//get notification
router.post('/notification', myNotification)

//add notification
router.post('/notification/add', userNotification)

//Delete 
router.delete('/notification/delete', DeleteNotification)


module.exports = router