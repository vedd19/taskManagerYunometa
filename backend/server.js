const express = require('express');
const app = express();
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()
const { connectToDB } = require("./db/db")
const taskRouter = require('./routes/task.route');

connectToDB()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
    origin: "*"
}))

app.get("/", (req, res) => {
    res.send("hii from backend")
})

app.use('/', taskRouter);

app.listen(process.env.PORT, () => {
    console.log("server is running at 4000")
})