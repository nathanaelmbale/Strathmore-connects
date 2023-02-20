const Community = require('../models/communityModel')
const mongoose = require('mongoose')


// get all the posts
const getCommunities = async (req, res) => {

    const community = await Community.find({}).sort({ createdAt: -1 })

    res.status(200).json(community)
}


//create a new Item
const createCommunity = async (req, res) => {

    //defines parameters for the data to be inputed in the database
    const { name, description, _id } = req.body
    console.log(name + " " + description + _id)
    //adds doc to db
    try {
        const existingCommunity = await Community.findOne({ _id })

        if (existingCommunity) {
            existingCommunity.accounts.push(req.user._id)
            const updatedCommunity = await existingCommunity.save()
            console.log(updatedCommunity)
            res.status(200).json(updatedCommunity)
        } else {
            const newCommunity = await Community.create({
                name,
                description,
                accounts: [req.user._id]
            })
            console.log("New community posted",newCommunity)
            res.status(200).json(newCommunity);
        }

    } catch (error) {
        console.log("failed to upload: " + error.message)
        res.status(400).json({ error: error.message })
    }

}

//remove someone from s community
const removeAccountFromCommunity = async (req, res) => {
    const communitykey = req.body.communitkey
    console.log(req.body)
    const accountId = req.user._id
    console.log(communitykey)
    console.log(accountId)

    try {
        const community = await Community.findById({_id :communitykey })
        if (!community) {
          console.error(`Community with ID ${communitykey} not found`)
        }
    
        const accounts = community.accounts || []
        
        const accountIndex = accounts.indexOf(accountId)


        if (accountIndex === -1) {
            res.send('Account with ID ${accountId} not found in community with ID ${_id }')
          throw new Error(`Account with ID ${accountId} not found in community with ID ${_id }`);
        }
    
        accounts.splice(accountIndex, 1)
    
        await community.updateOne({ accounts })
    
        res.send(community)

      } catch (error) {
        res.send(`Failed to remove account ${accountId} from community ${_id }: ${error.message}`)
        console.log(`${error.message}`);
        throw error;
      }
      
}
//delete a Item
const deleteCommunity = async (req, res) => {
    const { id } = req.params
    //checks if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: " No such item" })
    }
    //finds id
    const community = await Community.findOneAndDelete({ _id: id }).sort({ createdAt: -1 })

    if (!community) {
        return res.status(404).json({ error: "community not found" })
    }

    res.status(200).json(community)
    console.log("community was deleted")
}



module.exports = {
    createCommunity,
    getCommunities,
    removeAccountFromCommunity,
    deleteCommunity
}