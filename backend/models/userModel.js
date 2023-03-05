const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    notification: {
        type: [{
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: false
            }
        }],
        required: false
    }
})

// static signup method
userSchema.statics.signup = async function (email, password) {

    //validation
    if (!email || !password) {
        throw Error('You are requires to input values in all fields above')
    }
    //validity of email
    if (!validator.isEmail(email)) {
        throw Error('Invalid email ,please try again')
    }


    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}

//static login method
userSchema.statics.login = async function (email, password) {
    //validation
    if (!email || !password) {
        throw Error('You are requires to input values in all fields above')
    }

    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}

userSchema.statics.findByEmail = async function (email) {
    if (!email) {
        throw Error('You are requires to input values in all fields above')
    }
    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Incorrect email')
    }
    return user
}

module.exports = mongoose.model('User', userSchema)