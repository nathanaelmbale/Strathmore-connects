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
        community: {
            type: String ,
            required: true
        },
        imagePath: {
            type: String ,
            required: false
        },
        user_id: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        comments: {
            type: [{
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    default: mongoose.Types.ObjectId // generate a new ObjectId by default
                  },
                comment: {
                    type: String,
                    required: true
                },
                user: {
                    type: String,
                    required: true
                }
            }],
            required: false
        }
    }, {timestamps: true}
)
//item basically builds a colletion for us
module.exports = mongoose.model('Post', postSchema)