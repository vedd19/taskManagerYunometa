const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config()
const { connectToDB } = require("./db/db")
const taskRouter = require('./routes/task.route');

connectToDB()

// app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", (req, res) => {
    res.send("hii from backend")
})

app.use('/', taskRouter);

app.listen(4000, () => {
    console.log("server is running at 4000")
})