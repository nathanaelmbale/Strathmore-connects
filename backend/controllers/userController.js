const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '30d' })
}

//login user or store
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        console.log(email, password)
        //create a token
        const token = createToken(user._id)
        
        const name = user.name
        res.status(200).json({
            email,
            name,
            token,
            admin: user.admin,
            _id: user._id
        })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

const userId = async (req, res) => {
    const { email } = req.body
    console.log("Email", email)
    try {
        const user = await User.findOne({ email: email })
        console.log("USer", user)
        if (!user) res.status(400).json("User not found")
        res.status(200).json({ userId: user })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}
//signup user or store
const signupUser = async (req, res) => {
    const { name ,email, password } = req.body
    console.log(req.body)
    try {
        const user = await User.signup(name ,email, password)

        //create a token
        const token = createToken(user._id)

        res.status(200).json({
            email,
            token,
            name,
            admin: user.admin,
            _id: user._id
        })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//change passowrd
const changePassword = async (req, res) => {
    const { email, password } = req.body;
    console.log("FOund", password)
    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const user = await User.findOneAndUpdate(
            { email: email },
            { password: hash },
            { new: true } // This returns the updated document
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
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

        res.status(400).json({ message: error.message })
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
        res.status(400).json({ message: error.message })
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
        res.status(400).json({ message: error.message });
    }
}

//delete account 
const DeleteAccount = async (req, res) => {
    const { email } = req.body
    console.log(email)

    try {
        // find user by email
        const user = await User.findOne({ email: email })

        console.log(user)
        if (!user) {
            throw new Error('User not found');
        }



        //  the email matches the email on the schema
        if (user.email === email) {
            const deleted = await User.deleteOne({ email })
            res.status(200).json({ message: 'User deleted successfully' })
        }

        //check if user is an admin 
        if (user.admin === true) {
            const deleted = await User.deleteOne({ email })
            res.status(200).json({ message: 'User deleted successfully' })
        }

        // delete user document from database
        res.status(403).json({ message: 'Access denied' })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//make one an admin
const updateUserAdmin = async (req, res) => {
    const { email, admin } = req.body

    try {
        const user = await User.findByEmail(email)

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        user.admin = admin
        await user.save()
        console.log(user)
        res.status(200).json(user.email)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//remove admin
const removeAdmin = async (req, res) => {
    const { email } = req.body

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        // remove the admin property
        user.admin = undefined

        await user.save()
        console.log(user)

        res.status(200).json({ message: 'Admin removed successfully', user })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


module.exports = {
    loginUser,
    signupUser,
    userId,
    changePassword,
    myNotification,
    userNotification,
    updateUserAdmin,
    removeAdmin,
    DeleteNotification,
    DeleteAccount
}