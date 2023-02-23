require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
//routes
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const communityRoutes = require('./routes/community')

const URI = process.env.MONGO_URI
const port = process.env.PORT


//express app
const app = express()

//Global Middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//route
app.use('/user', userRoutes)
app.use('/post', postRoutes)
app.use('/community', communityRoutes)



mongoose.set('strictQuery', true)
//connect to dtabase
mongoose.connect(URI)
    .then(() => {
        //listen
        app.listen(port, () => {
            console.log("Connected to the database Listening on port:", port)
        })
    })
    .catch((error) => {
            console.log("error on the database:"+ error)
    })