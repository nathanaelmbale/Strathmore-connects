const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '30d' })
}

//login user or store
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)

        //create a token
        const token = createToken(user._id)

        res.status(200).json({
            email,
            token,
            admin: user.admin,
            _id: user._id
        })

    } catch (error) {
        res.status(400).json({ msg: error.message })
    }

}


//signup user or store
const signupUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.signup(email, password)

        //create a token
        const token = createToken(user._id)

        res.status(200).json({
            email,
            token,
            admin: user.admin,
            _id: user._id
        })

    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


//notification
const myNotification = async (req, res) => {
    const { email } = req.body
    //console.log(req.body)

    try {
        const user = await User.findOne({ email })
        if (!user) {
            throw Error('Couldnt find an email')
        }

        res.status(200).json({ email: user.email, notification: user.notification })

    } catch (error) {

        res.status(400).json({ msg: error.message })
    }
}

//Create a user notification
const userNotification = async (req, res) => {
    console.log(" notify", req.body)
    //notification is the id of the post
    const { _id, notificationId, title, description } = req.body
    //console.log(req.body)
    //console.log(_id , notificationId , title ,description)
    try {
        //const user = await User.login(_id)
        const user = await User.findById({ _id: _id })
        if (!user) {
            throw Error('Invalid user')
        }
        console.log("Found user", user.email)

        // create new notification object
        const newNotification = {
            _id: notificationId,
            title: title,
            description: description
        }

        console.log("hell", newNotification)

        // add notification object to user document
        //console.log(newNotification.description)
        user.notification.push(newNotification);

        // save changes to database
        await user.save()

        res.status(200).json({ email: user.email, notification: user.notification })

    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

//delete notification
const DeleteNotification = async (req, res) => {
    const { email, notificationId } = req.body

    console.log("body", req.body)

    try {

        const user = await User.findOne({ email: email })
        console.log("user", user)

        if (!user) {
            throw new Error('User not found');
        }

        // find index of notification with given ID
        const index = user.notification.findIndex(n => n._id.toString() === notificationId);
        if (index === -1) {
            throw new Error('Notification not found');
        }

        // remove notification from array
        user.notification.splice(index, 1)

        // save changes to database
        await user.save();

        res.status(200).json({ email: user.email, notification: user.notification });

    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

//delete account 
const DeleteAccount = async (req, res) => {
    const { email } = req.body
    console.log(email)

    try {
        // find user by email
        const user = await User.findOne({ email })

        if (!user) {
            throw new Error('User not found');
        }

        console.log(user.email)

        // check if user is an admin or the email matches the email on the schema
        if (user.admin !== true && user.email !== email) {
            throw new Error('Unauthorized');
        }

        // delete user document from database
        await User.deleteOne({ email })

        res.status(200).json({ msg: 'User deleted successfully' })

    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

module.exports = {
    loginUser,
    signupUser,
    myNotification,
    userNotification,
    DeleteNotification,
    DeleteAccount
}