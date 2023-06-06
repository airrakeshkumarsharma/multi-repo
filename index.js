const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('./model/user')

const app = express()

// All environments variables
const MONGODB_HOST = "mongodb+srv://efm:aSE253nD3Gw8pE8X@cluster0.9kl2w.mongodb.net/test?retryWrites=true&w=majority"
const port = process.env.PORT || 8080;


// Get users list from user service
app.get("/users", async (req, res) => {
    console.log("request resolved")
    const userData = await UserModel.find({})
    return res.send(userData)
})

app.post("/users", async (req, res) => {
    const userData = await UserModel.create(req.body)
    return res.send(userData)
})

mongoose.connect(MONGODB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
},
    (err) => {
        if (err) {
            console.error('FAILED TO CONNECT TO MONGODB');
            console.error(err);
        } else {
            console.log('CONNECTED TO MONGODB');
            app.listen(port, () => {
                console.log('Application running on port: ', port);
            });
        }
    }
);