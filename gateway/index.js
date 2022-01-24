const express = require('express');
const axios = require('axios');

const app = express()

// All environments variables
const USER_HOST = process.env.USER_HOST
const port = process.env.PORT || 3000;


// Get users list from user service
app.get("/users", (req, res) => {
    const userData = axios.get(`${USER_HOST}/users`)
    return res.send(userData)
})

app.post("/users", (req, res) => {
    const userData = axios.post(`${USER_HOST}/users`, { data:  req.body })
    return res.send(userData)
})


app.listen(port, () => {
    console.info("Gateway app is running on port ", port);
})