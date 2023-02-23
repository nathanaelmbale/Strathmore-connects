const mongoose = require('mongoose')

const Schema = mongoose.Schema

const communitySchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        accounts: {
            type: Array,
            required: false
        }
    }, {timestamps: true}
)
//item basically builds a colletion for us
module.exports = mongoose.model('Community', communitySchema)