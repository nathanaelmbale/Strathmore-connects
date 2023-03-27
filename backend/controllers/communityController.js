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
    const { name, description  ,email} = req.body
    console.log(name + " " + description)
    //adds doc to db
    try {
        const existingCommunity = await Community.findOne({ name })
        //console.log(existingCommunity)
        if (existingCommunity) {
            res.status(403).json({ message: "Community already exists" })
        } else {
            await Community.create({ name, description ,email })
            //returns all communities
            const community = await Community.find({}).sort({ createdAt: -1 })

            res.status(200).json({ message: community })
        }

    } catch (error) {
        console.log("failed to upload: " + error.message)
        res.status(400).json({ error: error.message })
    }

}

//edit community
const updateCommunity = async (req, res) => {
    const { name, description, _id } = req.body;
    console.log("Update ", req.body)

    try {
        const updatedCommunity = await Community.findByIdAndUpdate(
            _id,
            { name, description },
            { new: true }
        );
        console.log("Updated body", updatedCommunity)
        res.status(200).json(updatedCommunity);
    } catch (error) {
        console.log("Failed to update community: " + error.message);
        res.status(400).json({ error: error.message });
    }
};

//add user to community
const addUserToCommunity = async (req, res) => {
    const { name, description } = req.body;
    console.log(req.body)
    try {
        const community = await Community.findOneAndUpdate(
            { name: name, description: description },
            { $addToSet: { accounts: req.user._id } },
            { new: true }
        );

        if (!community) {
            return res.status(404).json({ error: 'Community not found' });
        }

        return res.status(200).json({ message: 'User added to community successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}


//remove someone from community
const removeAccountFromCommunity = async (req, res) => {
    const { communityId, accountId } = req.body
    console.log(req.body)


    try {
        const community = await Community.findById({ _id: communityId })
        if (!community) {
            console.error(`Community with ID ${communityId} not found`)
        }

        const accounts = community.accounts || []

        const accountIndex = accounts.indexOf(accountId)


        if (accountIndex === -1) {
            console.log(`Account with ID ${accountId} not found in community with ID ${_id}`)
            res.send.status(404).json({ error: error.message })

            throw new Error(`Account with ID ${accountId} not found in community with ID ${_id}`);
        }

        accounts.splice(accountIndex, 1)

        await community.updateOne({ accounts })

        res.send.status(200).json(community)

    } catch (error) {
        res.send({ error: error.message })
        console.log(`${error.message}`);
        throw error;
    }

}


//delete a Item
const deleteCommunity = async (req, res) => {
    const { id } = req.body
    //console.log(req.body)
    //checks if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "Community not found" })
    }
    //finds id
    const community = await Community.findById({ _id: id }).sort({ createdAt: -1 })

    console.log("community", community)
    if (!community) {
        return res.status(404).json({ error: "Community not found" })
    }

    await community.remove()

    const communities = await Community.find({}).sort({ createdAt: -1 })

    res.status(200).json(communities)
    console.log("community was deleted")
}



module.exports = {
    createCommunity,
    getCommunities,
    updateCommunity,
    addUserToCommunity,
    removeAccountFromCommunity,
    deleteCommunity
}