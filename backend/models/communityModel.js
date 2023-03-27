const mongoose = require('mongoose')
const User = require('./userModel')

const Schema = mongoose.Schema

const communitySchema = new Schema(
    {
        email: {
          type: String,
          required: false,
        },
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

//find accounts by community

communitySchema.statics.findUsersByCommunityId = async function (communityId ) {
    const community = await this.findById(communityId);
    if (!community) {
      throw new Error('Community not found');
    }
    
    console.log("community accounts",community.accounts)
    /*
    const accounts = community.accounts
    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts found for this community');
    }
    const user = await User.findByEmail({
        email: email
      })
      console.log("u",user)*/
    return community.accounts
  };
//item basically builds a colletion for us
module.exports = mongoose.model('Community', communitySchema)