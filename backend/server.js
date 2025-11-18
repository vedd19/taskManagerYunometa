const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config()

const { connectToDB } = require("./db/db")

connectToDB()

app.get("/", (req, res) => {
    res.send("hii from backend")
})

app.listen(4000, () => {
    console.log("server is running at 4000")
})