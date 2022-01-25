const express = require('express');
const axios = require('axios');

const app = express()

// All environments variables
const USER_HOST = process.env.USER_HOST
const port = process.env.PORT || 3000;


// Get users list from user service
app.get("/users", async (req, res) => {
    console.log(USER_HOST)
    const userData = await axios.get(`http://${USER_HOST}/users`)
    return res.send(userData.data)
})

app.post("/users", async (req, res) => {
    const userData = await axios.post(`http://${USER_HOST}/users`, { data:  req.body })
    return res.send(userData.data)
})


app.listen(port, () => {
    console.info("Gateway app is running on port ", port);
})