const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: false
        }, 
        imagePath: {
            type: String ,
            required: false
        },
        user_id: {
            type: String,
            required: true
        }
    }, {timestamps: true}
)
//item basically builds a colletion for us
module.exports = mongoose.model('Post', postSchema)